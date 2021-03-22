"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogInformationSchema = new Schema({
  introduce:String
});

blogInformationSchema.index({ id: 1 });

const BlogInformation = mongoose.model(
  "BlogInformation",
  blogInformationSchema
);

export default BlogInformation;
