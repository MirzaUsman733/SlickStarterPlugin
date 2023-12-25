// models/SearchData.js
const mongoose = require('mongoose');

const searchDataSchema = new mongoose.Schema({
    keyword: String,
    title: String,
    totalTokensUsed: Number,
    timestamp: { type: Date, default: Date.now },
});

const SearchData = mongoose.model('SearchData', searchDataSchema);

module.exports = SearchData;
