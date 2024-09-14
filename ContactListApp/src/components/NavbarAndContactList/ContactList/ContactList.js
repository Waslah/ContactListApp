import React, { useEffect, useState } from 'react';
import ContactData from './ContactData';
import './ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [sortField, setSortField] = useState('FirstName'); // Default sort field
  const [sortDirection, setSortDirection] = useState('asc'); // Default sort direction

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("https://contact-app-42311-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list.json");
        const data = await res.json();
        const contactsData = [];
        for (const key in data) {
          contactsData.push({
            key: key,
            email: data[key].email || 'Not Specified',
            FirstName: data[key].FirstName,
            LastName: data[key].LastName,
            tel: data[key].tel
          });
        }
        setContacts(contactsData);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const sortContacts = (field, direction) => {
    const sortedContacts = [...contacts].sort((a, b) => {
      const valueA = a[field].toUpperCase(); // For case-insensitive comparison
      const valueB = b[field].toUpperCase(); // For case-insensitive comparison

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setContacts(sortedContacts);
  };

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    sortContacts(field, newDirection);
  };

  return (
    <div className='contact-list'>
      <table>
        <thead>
          <tr>
            <th>
              <h5 >Email</h5>
            </th>
            <th>
              <p onClick={() => handleSort('FirstName')}>First Name {sortField === 'FirstName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</p>
            </th>
            <th>
              <p onClick={() => handleSort('LastName')}>Last Name {sortField === 'LastName' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}</p>
            </th>
            <th>
              <h5>Contact No </h5>
            </th>
            <th><h5>Actions</h5></th>
          </tr>
        </thead>
        <ContactData contacts={contacts} />
      </table>
    </div>
  );
};

export default ContactList;
