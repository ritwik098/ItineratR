var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: Number, default: 0 },
  day: { type: Number, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  imageUrl: { type: String }
});

var ItinerarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  schedule: [EventSchema],
  days: { type: Number },
  city: { type: String, required: true, index: true },
  userId: { type: ObjectId },
  rating: { type: Number }
},{
  minimize: false,
  timestamps: true
});

var Itinerary = mongoose.model('Itinerary', ItinerarySchema);

module.exports = Itinerary;
