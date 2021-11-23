import React from "react";

const AppContext = React.createContext({
    loggedIn: false,
    setLoggedIn: (status) => {},
});

export default AppContext;
