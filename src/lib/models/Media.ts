import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMedia extends Document {
  public_id: string;
  url: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  createdAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    public_id: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    format: { type: String },
    width: { type: Number },
    height: { type: Number },
    bytes: { type: Number },
  },
  { timestamps: true }
);

export const Media: Model<IMedia> =
  mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);

export default Media;
