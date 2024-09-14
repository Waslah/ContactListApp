import React, { useEffect, useState } from 'react'
import "./Navbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { contactListActions } from '../../../store/contact-slice';

const Navbar = () => {
    const dispatch = useDispatch();

    const totalContacts = useSelector(state => state.contact.totalContacts);
    useEffect(() => {
        const fetchTotalContacts = () => {
            fetch("https://contact-app-42311-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list.json")
                .then(res => res.json())
                .then(data => {
                    dispatch(contactListActions.fetchTotalContacts(data))
                })
        }
        fetchTotalContacts();
    }, [])

}

export default Navbar