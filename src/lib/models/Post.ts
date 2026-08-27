import mongoose, { Schema, Document, Model, Types } from "mongoose";
import "./Category";
import "./Tag";
import "./Author";

export interface IFAQ {
  question: string;
  answer: string;
}

export interface ISEO {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: {
    title?: string;
    description?: string;
    image?: string;
  };
  noIndex?: boolean;
}

export interface IFeaturedImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface IPost extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: IFeaturedImage;
  author: Types.ObjectId;
  category: Types.ObjectId[];
  tags: Types.ObjectId[];
  faqs: IFAQ[];
  status: "Draft" | "Published";
  isFeatured: boolean;
  seo: ISEO;
  relatedPosts: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const SEOSchema = new Schema<ISEO>(
  {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    focusKeyword: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    ogTitle: { type: String, default: "" },
    ogDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    twitterCard: {
      title: { type: String, default: "" },
      description: { type: String, default: "" },
      image: { type: String, default: "" },
    },
    noIndex: { type: Boolean, default: false },
  },
  { _id: false }
);

const FeaturedImageSchema = new Schema<IFeaturedImage>(
  {
    url: { type: String, default: "" },
    alt: { type: String, default: "" },
    caption: { type: String, default: "" },
  },
  { _id: false }
);

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    content: { type: String, default: "" },
    excerpt: { type: String, default: "" },
    featuredImage: { type: FeaturedImageSchema, default: () => ({ url: "", alt: "", caption: "" }) },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    faqs: [FAQSchema],
    status: { type: String, enum: ["Draft", "Published"], default: "Draft", index: true },
    isFeatured: { type: Boolean, default: false, index: true },
    seo: { type: SEOSchema, default: () => ({}) },
    relatedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

export const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
