import React from 'react';
import {useReducer, createContext } from 'react';

let initialState = {
    alumniID: '',
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:'',
    graduatedIn:'',
    associatedOrgs:[],
    newUser: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "logout":
            return initialState;
        case "set-alumni-id":
            return {...state, alumniID: action.payload };
        case "set-first-name":
            return {...state, firstName: action.payload };
        case "set-last-name":
            return {...state, lastName: action.payload };
        case "set-email":
            return {...state, email: action.payload };
        case "set-phone-number":
            return {...state, phoneNumber: action.payload };
        case "set-grad-year":
            return {...state, graduatedIn: action.payload };
        case "set-associated-org":
            return {...state, associatedOrgs: action.payload };
        case "add-associated-org":
            return {
                ...state,
                associatedOrgs: state.associatedOrgs.concat(action.payload)
            }
        case "remove-associated-org":
            return {
                ...state,
                associatedOrgs: state.associatedOrgs.filter(org => org !== action.payload)
            }
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

    const setAlumniID = (alumni_id) => {
        dispatch({
            type: "set-alumni-id",
            payload: alumni_id,
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

    const setGradYear = (year) => {
        dispatch({
            type: "set-grad-year",
            payload: year,
        });
    };

    const setAssociatedOrg = (org) => {
        dispatch({
            type: "set-associated-org",
            payload: org,
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
            alumniID: state.alumniID,
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            associatedOrgs: state.associatedOrgs,
            graduatedIn: state.graduatedIn,
            phoneNumber: state.phoneNumber,
            newUser: state.newUser,
            logout,
            setAlumniID,
            setFirstName,
            setLastName,
            setEmail,
            setPhoneNumber,
            setGradYear,
            setAssociatedOrg,
            setNewUser,
        }}> {children} </UserContext.Provider>
    )
};

export default UserContextProvider;