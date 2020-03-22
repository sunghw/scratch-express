import { Contact } from '../models/contactModel';

export const index = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch(e) {
        console.log(e);
        res.status(500).json({ message: err.message });
    }
}
// export const index = (req, res) => {
//     Contact.get((err, contacts) => {
//         if (err) {
//             res.json({
//                 status: "error",
//                 message: err,
//             });
//         }
//         res.json({
//             status: "success",
//             message: "Contacts retrieved successfully",
//             data: contacts
//         });
//     });
// }