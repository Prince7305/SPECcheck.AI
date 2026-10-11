import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    githubId: { type: Number, required: true, unique: true },
    login: { type: String, required: true },
    name: String,
    avatarUrl: String,
    accessTokenEnc: { type: String, required: true }, // encrypted GitHub token
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
