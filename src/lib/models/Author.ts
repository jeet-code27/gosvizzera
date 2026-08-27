import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAuthor extends Document {
  name: string;
  avatar: string;
  role: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true, trim: true },
    avatar: { type: String, default: "" },
    role: { type: String, default: "RCM & Medical Billing Specialist" },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Author: Model<IAuthor> =
  mongoose.models.Author || mongoose.model<IAuthor>("Author", AuthorSchema);

export default Author;
