"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bloggerInformationSchema = new Schema({
  nickname:String,
  name:String,
  gender:String,
  birthday:String,
  image:String,
  live:String,
  nowlive:String,
  company:String,
  profession:String,
  school:String,
  major:String,
  constellation:String,
  wx:String,
  email:String,
  character:String,
  hobby:String,
  motto:String
});

bloggerInformationSchema.index({ id: 1 });

const BloggerInformation = mongoose.model(
  "BloggerInformation",
  bloggerInformationSchema
);

export default BloggerInformation;
