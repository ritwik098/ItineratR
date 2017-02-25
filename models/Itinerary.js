var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ItinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  schedule: [{ type: Object }],
  days: { type: Number },
  city: { type: String, required: true },
  userId: { type: ObjectId }
},{
  minimize: false,
  timestamps: true
});

var Itinerary = mongoose.model('Itinerary', ItinerarySchema);

module.exports = Itinerary;
