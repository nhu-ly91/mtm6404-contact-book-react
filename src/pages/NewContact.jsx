import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase/db";

export default function NewContact() {
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contactsRef = collection(db, "contacts");
        const docRef = await addDoc(contactsRef, contact);
        navigate(`/contact/${docRef.id}`);
    };

    return (
        <div className="container">
            <h2>New Contact</h2>
            <form onSubmit={handleSubmit}>
                <input name="firstName" value={contact.firstName} onChange={handleChange} placeholder="First Name" required />
                <input name="lastName" value={contact.lastName} onChange={handleChange} placeholder="Last Name" required />
                <input name="email" value={contact.email} onChange={handleChange} placeholder="Email" required />
                <input name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" required />
                <button type="submit">Add Contact</button>
                <button type="button" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
}