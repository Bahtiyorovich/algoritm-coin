import { Schema, model } from 'mongoose'

const MentorSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  displayName: { 
    type: Schema.Types.String, 
    required: true,
  },
  phoneNumber: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  } 
}, { timestamps: true});

export const Mentor = model('mentor', MentorSchema)