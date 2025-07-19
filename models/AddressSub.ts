// models/AddressSub.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface AddressSubDoc extends Document {
  name:     string;
  street:   string;
  city:     string;
  state:    string;
  zipCode:  string;
}

export const AddressSubSchema = new Schema<AddressSubDoc>({
  name:     { type: String, required: true },
  street:   { type: String, required: true },
  city:     { type: String, required: true },
  state:    { type: String, required: true },
  zipCode:  { type: String, required: true },
}, { _id: false });
