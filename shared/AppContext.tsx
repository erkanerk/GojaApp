import React, { useContext } from 'react';

const AppContext = React.createContext({
    loggedIn: false,
    setLoggedIn: (status) => {},
    userInfo: {
        _id: null,
        profileAudio: null,
        profilePicture: null,
        userName: null,
        email: null,
    },
    setUserInfo: (user) => {},
});

export type TypeAppContext = typeof AppContext;
export default AppContext;
