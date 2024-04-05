import {promises as fs} from 'fs'; 
import { nanoid } from 'nanoid';
import path from 'path';

const contactsPath = path.resolve('./db/contacts.json');

export const getListContacts = async () => {
    try { 
        const data = await fs.readFile(contactsPath); 
        return JSON.parse(data); 
    } catch (error) {
        console.log(error); 
    }
}

export const getOneContactByid = async (id) => {
    try {
        const list = await getListContacts();
        const contact = list.find((el) => el.id === id); 
        if (!contact) {
            return null;
        }
        return contact;
    } catch (error) {
        console.log(error)
    }
}

export const deleteContactByid = async (id) => {
        try {
            const list = await getListContacts();
            const delteContacts = list.find((el) => el.id === id);
            if(!delteContacts) {
                return null;
            }
            const newList = list.filter((el) => el.id !== id);
            await fs.writeFile(contactsPath, JSON.stringify(newList));
            return delteContacts; 
        } catch (error) {
             console.log(error)
        }
}


export const addContact = async (body) => {
    try {
        const list = await getListContacts();
        const newContact = { ...body, id: nanoid() };
        list.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(list)); 
        return newContact;
    } catch (error) {
        console.log(error)
    }
};

export const updateContactById = async (id, body) => {
    try {
        const list = await getListContacts();
        const index = list.findIndex((el) => el.id === id);
        if (index === -1) {
            return null;
        }
        const updatedContact = { ...list[index], ...body };
        list[index] = updatedContact;
        await fs.writeFile(contactsPath, JSON.stringify(list));
        return updatedContact;
    } catch (error) {
        console.log(error)
    }
}