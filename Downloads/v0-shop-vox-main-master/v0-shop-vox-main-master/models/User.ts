// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';
import { AddressSubSchema, AddressSubDoc } from './AddressSub';

export interface UserDoc extends Document {
  name:       string;
  email?:     string;
  password?:  string;
  image?:     string;
  provider?:  'google' | 'credentials';
  phone?:     string;
  addresses:  AddressSubDoc[];
}

const userSchema = new Schema<UserDoc>({
  name:         { type: String, required: true },
  email:        { type: String, unique: true, sparse: true },
  password:     String,
  image:        String,
  provider:     { type: String, enum: ['google','credentials'] },
  phone:        { type: String, unique: true, sparse: true },

  // Replace single-line fields with an array of sub-documents:
  addresses: {
    type: [ AddressSubSchema ],
    default: [],
    validate: {
      validator: (addrs: AddressSubDoc[]) => addrs.length <= 10,
      message:   'Cannot have more than 10 addresses'
    }
  },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<UserDoc>('User', userSchema);
