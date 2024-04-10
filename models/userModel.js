import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Set name for contact"],
    },
    email: { 
        type: String, 
        unique: true,
    },
    phone: { 
        type: String, 

    }, 
    favourite: { 
        type: Boolean, 
        default: false, 
    },
}, { 
    versionKey: false,  
})

export const User = model("User", userSchema);