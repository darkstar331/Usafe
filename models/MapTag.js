import mongoose from 'mongoose';

const mapTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists before defining it
const MapTag = mongoose.models.MapTag || mongoose.model('MapTag', mapTagSchema);

export default MapTag;
