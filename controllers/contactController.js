import { Contact } from '../models/contactModel';
import * as Joi from 'joi';

// get all
export const index = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

const validateContact = (contact) => {
    const schema = {
        name: Joi.string().min(2).required(),
        email: Joi.string().min(3).required(),
    };
    return Joi.validate(contact, schema);
}

// create one contact
export const create = async (req, res) => {
    const { error } = validateContact(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        // gender: req.body.gender,
        // age: (req.)
    });
    
    try {
        const newContact = await contact.save();
        return res.status(201).json(newContact);    
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}