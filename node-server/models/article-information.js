"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const articleInformationSchema = new Schema({
  article:String,
  html:String,
  author: String,
  category: String,
  isPublic: Boolean,
  isCommend: Boolean,
  image:String,
  title: String,
  create_time:String,
  comments:Array,
  comment:{
    type:Number,
    default:0
  },
  like:{
    type:Number,
    default:0
  },
  read:{
    type:Number,
    default:0
  }
});

articleInformationSchema.index({ id: 1 });

const ArticleInformation = mongoose.model(
  "ArticleInformation",
  articleInformationSchema
);

export default ArticleInformation;
