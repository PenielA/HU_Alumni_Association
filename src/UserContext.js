import React from 'react';
import {useReducer, createContext } from 'react';

let initialState = {
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:'',
    password: '',
    newUser: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "logout":
            return initialState;
        case "set-first-name":
            return {...state, firstName: action.payload };
        case "set-last-name":
            return {...state, lastName: action.payload };
        case "set-email":
            return {...state, email: action.payload };
        case "set-phone-number":
            return {...state, phoneNumber: action.payload };
        case "set-password":
            return {...state, password: action.payload };
        case "new-user-status":
        return {...state, newUser: action.payload };
        default:
            return state;
    }
};

export const UserContext = createContext(initialState);

const UserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const logout = () => {
        dispatch({
            type: "logout",
        });
    };

    const setFirstName = (first_Name) => {
        dispatch({
            type: "set-first-name",
            payload: first_Name,
        });
    };

    const setLastName = (last_Name) => {
        dispatch({
            type: "set-last-name",
            payload: last_Name,
        });
    };

    const setEmail = (email) => {
        dispatch({
            type: "set-email",
            payload: email,
        });
    };

    const setPhoneNumber = (contact) => {
        dispatch({
            type: "set-phone-number",
            payload: contact,
        });
    };

    const setPassword = (pword) => {
        dispatch({
            type: "set-password",
            payload: pword,
        });
    };

    const setNewUser = (new_user) => {
        dispatch({
            type: "new-user-status",
            payload: new_user,
        });
    };
    

    return(
        <UserContext.Provider value={{
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            phoneNumber: state.phoneNumber,
            password: state.password,
            newUser: state.newUser,
            logout,
            setFirstName,
            setLastName,
            setEmail,
            setPhoneNumber,
            setPassword,
            setNewUser,
        }}> {children} </UserContext.Provider>
    )
};

export default UserContextProvider;