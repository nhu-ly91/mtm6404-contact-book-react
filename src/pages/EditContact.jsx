import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import db from "../firebase/db";

export default function EditContact() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        const fetchContact = async () => {
            const contactRef = doc(db, "contacts", id);
            const contactSnap = await getDoc(contactRef);
            if (contactSnap.exists()) {
                setContact(contactSnap.data());
            } else {
                console.log("Contact not found");
            }
        };

        fetchContact();
    }, [id]);

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const contactRef = doc(db, "contacts", id);
        await updateDoc(contactRef, contact);
        navigate(`/contact/${id}`);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if (confirmDelete) {
            const contactRef = doc(db, "contacts", id);
            await deleteDoc(contactRef);
            navigate("/");
        }
    };

    return (
        <div className="container">
            <h2>Edit Contact</h2>
            <form onSubmit={handleUpdate}>
                <input name="firstName" value={contact.firstName} onChange={handleChange} placeholder="First Name" required />
                <input name="lastName" value={contact.lastName} onChange={handleChange} placeholder="Last Name" required />
                <input name="email" value={contact.email} onChange={handleChange} placeholder="Email" required />
                <input name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" required />

                <button type="submit">Update Contact</button>
                <Link to={`/contact/${id}`}><button type="button">Cancel</button></Link>
            </form>

            <button onClick={handleDelete} style={{marginTop: '1rem', color:'red'}}>Delete Contact</button>
        </div>
    );
}