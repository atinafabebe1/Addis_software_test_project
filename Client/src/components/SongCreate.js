import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled/macro';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createSongAsync } from '../redux/actions/songActions';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { css, keyframes } from '@emotion/react';
import { PacmanLoader } from 'react-spinners';

const MAX_FILE_SIZE = 9 * 1024 * 1024; // 10MB size limit

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 40px 0;
  background-color: #f2f2f2;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 400px;
  margin: auto;
`;

const FormHeader = styled.h2`
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
  color: #333;
`;

const FormContent = styled.div`
  padding: 20px;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const ErrorText = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 8px;
`;

const Note = styled.div`
  color: #999;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: ${({ disabled }) => (disabled ? '#ccc' : '#3498db')};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  animation: ${({ isSubmitting }) => (isSubmitting ? `${pulse} 1s infinite` : 'none')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#2980b9')};
  }
`;

const AddIcon = styled(AiOutlinePlusCircle)`
  margin-right: 5px;
`;

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    artist: Yup.string().required('Artist is required'),
    genre: Yup.string().required('Genre is required'),
});

const initialValues = {
    title: '',
    artist: '',
    genre: '',
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const SongCreate = () => {
    const navigate = useNavigate();
    const successMessageDisplayed = useRef(false);
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('artist', values.artist);
        formData.append('genre', values.genre);
        formData.append('coverImage', coverImage);
        formData.append('file', file);

        try {
            dispatch(createSongAsync(formData));
            setIsSubmitting(true);
        } catch (error) {
            console.error('Error creating song:', error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setCoverImage(file);
    };

    const handleSongFileChange = (event) => {
        const File = event.target.files[0];
        setFile(File);
    };

    const status = useSelector((state) => state.songs.status);

    useEffect(() => {
        if (status === 201 && !successMessageDisplayed.current) {
            toast.success('Music created successfully!', { autoClose: 3000 });
            setTimeout(() => {
                setIsSubmitting(false);
                navigate('/');
            }, 4000);
        } else if (status === 500 && !successMessageDisplayed.current) {
            console.log("500 status.")
            toast.error(`Error creating music 😌`, { autoClose: 3000 });
            setIsSubmitting(false);
        }
        return () => {
            if (status === 201) {
                successMessageDisplayed.current = true;
            }
        };
    }, [status, navigate]);

    return (
        <Container>
            <FormContainer>
                <FormHeader>Add New Song</FormHeader>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isValid }) => (
                        <Form>
                            <FormContent>
                                <FormField>
                                    <Label>Title</Label>
                                    <Input type="text" name="title" />
                                    <ErrorMessage name="title" component={ErrorText} />
                                </FormField>
                                <FormField>
                                    <Label>Artist</Label>
                                    <Input type="text" name="artist" />
                                    <ErrorMessage name="artist" component={ErrorText} />
                                </FormField>
                                <FormField>
                                    <Label>Genre</Label>
                                    <Input type="text" name="genre" />
                                    <ErrorMessage name="genre" component={ErrorText} />
                                </FormField>
                                <FormField>
                                    <Label>Cover Image (PNG or JPG)</Label>
                                    <Input
                                        type="file"
                                        accept=".png, .jpg, .jpeg"
                                        name="coverImage"
                                        onChange={handleImageChange}
                                    />
                                    <ErrorText>
                                        {coverImage && coverImage.size > MAX_FILE_SIZE && (
                                            <>
                                                <br />
                                                <span>Maximum file size allowed is 10MB.</span>
                                            </>
                                        )}
                                    </ErrorText>
                                </FormField>
                                <FormField>
                                    <Label>Song File (MP3)</Label>
                                    <Input
                                        type="file"
                                        accept=".mp3"
                                        name="file"
                                        onChange={handleSongFileChange}
                                    />
                                    <ErrorText>
                                        {file && file.size > MAX_FILE_SIZE && (
                                            <>
                                                <br />
                                                <span>Maximum file size allowed is 10MB.</span>
                                            </>
                                        )}
                                    </ErrorText>
                                    {file && (
                                        <Note>
                                            Uploading this music file might take approximately{' '}
                                            {Math.ceil(file && file.size / 1000000 * 40)} seconds.
                                            <br />
                                            Optimize your experience by using smaller file sizes.
                                        </Note>
                                    )}
                                </FormField>
                                <Button
                                    type="submit"
                                    disabled={!isValid || !coverImage || !file || isSubmitting}
                                    isSubmitting={isSubmitting}
                                >
                                    {!isSubmitting ? (
                                        <>
                                            <AddIcon />
                                            Create
                                        </>
                                    ) : (
                                        <p>...creating</p>
                                    )}
                                </Button>
                            </FormContent>
                        </Form>
                    )}
                </Formik>
            </FormContainer>
            <ToastContainer />
        </Container>
    );
};

export default SongCreate;
