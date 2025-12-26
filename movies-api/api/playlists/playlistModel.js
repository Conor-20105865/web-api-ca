import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  movies: [{ type: Number }],
  createdAt: { type: Date, default: Date.now }
});

// User can't have two playlists with the same name
PlaylistSchema.index({ name: 1, username: 1 }, { unique: true });

PlaylistSchema.statics.findByUsername = function (username) {
  return this.find({ username: username });
};

export default mongoose.model('Playlist', PlaylistSchema);
