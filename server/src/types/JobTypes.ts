import { Schema } from "mongoose";

export type TJob = {
    _id: string;
    imagesUrl: string[];
    title: string;
    description: string;
    status: Status;
    location: string;
    coordinates: number[];
    userRef: Schema.Types.ObjectId;
}

type Status = 'done' | 'pending'