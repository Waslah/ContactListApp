import React, { useEffect, useState } from 'react';
import "./Form.css";
import addnewImage from "../../../assets/add-new.svg";
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../Ui/Button.js';
import { contactListActions } from '../../../store/contact-slice';
import { addContact } from '../../../store/contact-actions';

const Form = () => {

  const dispatch = useDispatch();
  const existingContactKey = useSelector(state => state.contact.key);
  const [userData, setUserData] = useState({
    FirstName: "",
    LastName: "",
    tel: "",
    email: "",  // Optional email field
  });

  useEffect(() => {
    const fetchExistingContact = async () => {
      if (existingContactKey) {
        const res = await fetch(`https://contact-app-42311-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list/${existingContactKey}.json`);
        const existingContact = await res.json();
        setUserData({
          FirstName: existingContact?.FirstName || "",
          LastName: existingContact?.LastName || "",
          tel: existingContact?.tel || "",
          email: existingContact?.email || ""  // Pre-fill email if it exists
        });
      }
    }
    fetchExistingContact();
  }, [existingContactKey]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Ensure required fields are filled
    if (!userData.FirstName || !userData.LastName || !userData.tel) {
      alert("First Name, Last Name, and Phone Number are required.");
      return;
    }

    if (existingContactKey) {
      // Dispatching update if a contact key is present
      dispatch(contactListActions.updateContact({
        key: existingContactKey,
        FirstName: userData?.FirstName,
        LastName: userData?.LastName,
        tel: userData?.tel,
        email: userData?.email  // Include optional email
      }));
    } else {
      // Dispatching new contact addition if no contact key exists
      dispatch(addContact(userData));
    }

    // Resetting form after submission
    setUserData({
      FirstName: "",
      LastName: "",
      tel: "",
      email: ""  // Reset email as well
    });
  }

  const inputHandler = (e) => {
    const { name, value } = e.target;  // Corrected destructuring
    setUserData((prevValue) => ({
      ...prevValue,
      [name]: value  // Dynamically update the correct field
    }));
  }

  return (
    <form className='form' onSubmit={submitHandler}>
      <div className='add-new-img'>
        <img src={addnewImage} alt="Add new contact" /> 
      </div>
      <div className='input-text'>
        <input
          type='text'
          placeholder='First Name'
          name='FirstName'  
          value={userData.FirstName}  
          onChange={inputHandler} 
          required />  {/* First Name is required */}
        <input
          type='text'
          placeholder='Last Name'
          name='LastName'
          value={userData.LastName}
          onChange={inputHandler} 
          required />  {/* Last Name is required */}
      </div>
      <div className='input-tel'>
        <input
          type='text'
          placeholder='7854809325'
          name='tel'
          value={userData.tel}
          onChange={inputHandler} 
          required />  {/* Phone number is required */}
      </div>
      <div className='input-email'>
        <input
          type='email'
          placeholder='Optional Email'
          name='email'
          value={userData.email}
          onChange={inputHandler} />  {/* Email is optional */}
      </div>
      <Button name='Add' />
    </form>
  )
}

export default Form;
