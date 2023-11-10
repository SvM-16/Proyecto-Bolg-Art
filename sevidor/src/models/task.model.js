import mongoose from "mongoose";

const taskSchema = new mongoose.Schema( {
    nombre: {
        type: String,
        required: true
    },
    descripion: {
        type: String,
        required: true
    },
    Urlimagen:{
        type:String,
        required:true
    },
    propietario: {
        type: String,
        required: true
    },
    precio: {
        type:Number,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
} )

export default mongoose.model( "Task", taskSchema )