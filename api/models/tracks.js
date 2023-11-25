const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackSchema = new Schema({
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    audioUrl: { type: String, required: true }, 
    album: { type: Schema.Types.ObjectId, ref: 'Album' },
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;