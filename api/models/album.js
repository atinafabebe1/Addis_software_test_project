const mongoose = require('mongoose');
const { Schema } = mongoose;

const albumSchema = new Schema({
    title: { type: String, required: true },
    artist: { type: Schema.Types.ObjectId, ref: 'Artist' },
    releaseYear: { type: Number },
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
