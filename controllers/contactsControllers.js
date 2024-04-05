import  { getListContacts, getOneContactByid, deleteContactByid, addContact, updateContactById} from "../services/contactsServices.js";


export const getAllContacts = async (req, res) => {
    try {
        const list = await getListContacts();
        res.json(list); 
    } catch (error) {
        console.log(error)
    }
};

export const getOneContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await getOneContactByid(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json(contact).status(200);
    } catch (error) {
        console.log(error)
    }
};

export const deleteContact =async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await deleteContactByid(id);
        if(!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({
            message: 'Contact deleted',
            contact
        }).status(200);
    } catch (error) {
        console.log(error)
    }
};

export const createContact = async (req, res) => {
try {
    const dataNewContact = req.body;
    const newContact = await addContact(dataNewContact);
    if(!newContact) {
        return res.status(400).json({ message: 'Contact not created' });
    }
    res.json(newContact).status(201);
} catch (error) {
    console.log(error)
} 
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const update = await updateContactById (id, data);
    if(!update) {
        return res.status(400).json({ message: 'Contact not updated' });
    }
    res.json(update).status(200);
};
