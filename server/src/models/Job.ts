import mongoose, { Schema } from "mongoose";
import { TJob } from "../types/JobTypes";


const JobSchema = new mongoose.Schema<TJob>({
    imagesUrl: [String],
    title: String,
    description: String,
    status: { type: String, enum: ['done', 'pending'], default: 'pending' },
    location: String,
    coordinates: [Number],
    userRef: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Job = mongoose.model("Job", JobSchema);

export default Job;