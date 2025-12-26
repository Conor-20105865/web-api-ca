import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  movieId: { type: Number, required: true },
  username: { type: String, required: true },
  addedAt: { type: Date, default: Date.now }
});

// stop double favoriting
FavouriteSchema.index({ movieId: 1, username: 1 }, { unique: true });

FavouriteSchema.statics.findByUsername = function (username) {
  return this.find({ username: username });
};

export default mongoose.model('Favourite', FavouriteSchema);
