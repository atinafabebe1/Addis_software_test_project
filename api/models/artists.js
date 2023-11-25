const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistSchema = new Schema({
    name: { type: String, required: true },
    albums: [{ type: Schema.Types.ObjectId, ref: 'Album' }],
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;



