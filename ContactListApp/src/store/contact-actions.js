import { contactListActions } from "./contact-slice";

export const addContact = (userData) => {
    return (dispatch) => {
        // Specify the endpoint where you want to add a new contact
        fetch('https://contact-app-42311-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list.json',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            })
            .then(() => {
                // Fetch the updated contact list from the 'contact-list' node
                return fetch("https://contact-app-42311-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list.json");
            })
            .then(res => res.json())
            .then(data => {
                dispatch(contactListActions.fetchTotalContacts(data));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

export const deleteContact = (deleteKey) => {
    return (dispatch) => {
        fetch(`https://contact-app-42311-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list/${deleteKey}.json`,
            {
                method: "DELETE"
            })
            .then(() => {
                // Fetch the updated contact list after deletion
                return fetch("https://contact-app-42311-default-rtdb.asia-southeast1.firebasedatabase.app/contact-list.json");
            })
            .then(res => res.json())
            .then(data => {
                dispatch(contactListActions.fetchTotalContacts(data));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}
