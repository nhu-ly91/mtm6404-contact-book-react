import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase/db";

export default function ContactView() {
    const { id } = useParams();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            const contactRef = doc(db, "contacts", id);
            const contactSnap = await getDoc(contactRef);
            if (contactSnap.exists()) {
                setContact({id: contactSnap.id, ...contactSnap.data()});
            } else {
                console.log("No such contact!");
            }
        };

        fetchContact();
    }, [id]);

    if (!contact) return <p>Loading contact...</p>

    return (
        <div className="container">
            <h2>{contact.firstName} {contact.lastName}</h2>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>

            <Link to="/">
                <button>← Back to Contacts</button>
            </Link>

            <Link to={`/edit/${contact.id}`}>
                <button>Edit</button>
            </Link>
        </div>
    );
}