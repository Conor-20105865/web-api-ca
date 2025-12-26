import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  movieId: { type: Number, required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 0, max: 10 },
  createdAt: { type: Date, default: Date.now }
});

ReviewSchema.statics.findByMovieId = function (movieId) {
  return this.find({ movieId: movieId });
};

ReviewSchema.statics.findByUsername = function (username) {
  return this.find({ username: username });
};

export default mongoose.model('Review', ReviewSchema);
