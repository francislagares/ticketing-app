import mongoose from 'mongoose';
import { Password } from '../utils/password';

// Interface that describes properties
// required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// Interface that describes User Model properties
interface UserModel extends mongoose.Model<UserDoc> {
  createOne(attrs: UserAttrs): UserDoc;
}

// Interface that describes User Document properties
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.createOne = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
