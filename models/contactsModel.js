import { model, Schema } from "mongoose";

const contactSchemas = new Schema({
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
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: "user", 
    },
}, { 
    versionKey: false,  
    // timestamps: true,
})

export const Contacts = model("Contacts", contactSchemas);
