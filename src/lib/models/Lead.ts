import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  firstName: string;
  lastName: string;
  workEmail: string;
  countryCode: string;
  phoneNumber: string;
  practiceName: string;
  role: string;
  specialty: string;
  primaryService: string;
  challenges?: string;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  notes?: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema<ILead> = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    workEmail: {
      type: String,
      required: [true, "Work email is required"],
      trim: true,
      lowercase: true,
    },
    countryCode: {
      type: String,
      default: "+1",
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },
    practiceName: {
      type: String,
      required: [true, "Practice name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },
    specialty: {
      type: String,
      required: [true, "Specialty is required"],
      trim: true,
    },
    primaryService: {
      type: String,
      required: [true, "Primary service is required"],
      trim: true,
    },
    challenges: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Closed"],
      default: "New",
    },
    notes: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "Contact Form / Strategy Call",
    },
  },
  {
    timestamps: true,
  }
);

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
