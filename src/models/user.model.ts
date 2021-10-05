import mongoose from 'mongoose';
interface User {
  name: string;
  email: string;
  shopname: string;
  passowrd: string;
}

const userSchema = new mongoose.Schema<User>({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  shopname: { type: String, required: true, unique: true },
});

export default mongoose.model<User>('User', userSchema);
