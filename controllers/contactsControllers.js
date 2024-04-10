import { Types } from "mongoose";
import { asyncCatch } from "../helpers/asynCatch.js";
import { User } from "../models/userModel.js";
import  { getListContacts, getOneContactByid, deleteContactByid, addContact, updateContactById} from "../services/contactsServices.js";


export const getAllContacts = asyncCatch (async (req, res) => {
        const list = await User.find();
        res.status(200).json(list); 
});

export const getOneContact = asyncCatch(async (req, res, next) => {
    const { id } = req.params;
        const isValid = Types.ObjectId.isValid(id); 
        if(!isValid) {
            return res.status(404).json({ message: 'Not found' });
        }
        const getOne = await User.findById(req.params.id);
        res.json(getOne).status(200);
    });


export const deleteContact = asyncCatch (async (req, res) => {
        const DeleteContact = await User.findByIdAndDelete(req.params.id);
        // if(!contact) {
        //     return res.status(404).json({ message: 'Not found' });
        // }
        res.json(DeleteContact).status(200);
});

export const createContact = asyncCatch (async (req, res) => {

    const newUser = await User.create(req.body);
    if(!newUser) {
        return res.status(400).json({ message: 'Contact not created' });
    }
    res.status(201).json(newUser);

});

export const updateContact = asyncCatch(async (req, res, next) => {
    const update = await User.findByIdAndUpdate(req.params, req.body, {new: true, runValidators: true});
    if(Object.keys(data).length === 0){
        res.status(400).json({ message: "Body must have at least one field" });
    }
    
    if(!update) {
        return res.status(400).json({ message: 'Not found' });
    }
    res.json(update).status(200);
});
