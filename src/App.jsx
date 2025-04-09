import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';
import ContactView from './pages/ContactView';
import './ContactBook.css';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
        <Route path="/contact/:id" element={<ContactView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
