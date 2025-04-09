import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db from '../firebase/db';
import { Link } from 'react-router-dom';

function ContactList(){
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchContacts = async () => {
            const contactsRef = collection(db, 'contacts');
            const q = query(contactsRef, orderBy('lastName'));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log("Fetched contacts:", data);
            setContacts(data);
        }
        fetchContacts();
}, []);

    const filteredContacts = contacts.filter(contact => {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLocaleLowerCase();
        return fullName.includes(searchTerm.toLocaleLowerCase());
    });

return (
    <div>
        <h1>Contacts</h1>
        <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.5rem' }}
        />
        <ul>
            {filteredContacts.map(contact => (
                <li key={contact.id}>
                    <Link to={`/contact/${contact.id}`}>
                        {contact.firstName} {contact.lastName}
                    </Link>
                </li>
            ))}
        </ul>
        <Link to="/new">
            <button>➕ Add Contact</button>
        </Link>
    </div>
);
}

export default ContactList;