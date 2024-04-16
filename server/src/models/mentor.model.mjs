import { Schema, model } from 'mongoose'

const MentorSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  status:{
    type: Schema.Types.String,
    required: true,
  }
}, { timestamps: true});

export const Mentor = model('mentor', MentorSchema)