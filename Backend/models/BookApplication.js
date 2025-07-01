const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookApplicationSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    // other fields
}, { timestamps: true });

module.exports = mongoose.model('BookApplication', BookApplicationSchema);
