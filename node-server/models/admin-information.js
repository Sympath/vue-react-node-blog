"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adminInformationSchema = new Schema({
  username: String,
  password: {
    type: String,
    select: false,
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    },
  },
});

adminInformationSchema.index({ id: 1 });

const AdminInformation = mongoose.model(
  "AdminInformation",
  adminInformationSchema
);

export default AdminInformation;
