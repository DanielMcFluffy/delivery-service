import mongoose from "mongoose";


const JobSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, enum: ['done', 'pending'], default: 'pending' },
    location: String,
    coordinates: [Number],
    userRef: String
}, { timestamps: true });

const Job = mongoose.model("Job", JobSchema);

export default Job;