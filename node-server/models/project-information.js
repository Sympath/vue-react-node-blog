"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectInformationSchema = new Schema({
  title: String,
  url: String,
  author:String,
  image:String,
  status: String,
  introduce: String,
  create_time: String,
});

projectInformationSchema.index({ id: 1 });

const ProjectInformation = mongoose.model(
  "ProjectInformation",
  projectInformationSchema
);

export default ProjectInformation;
