export const validateEmail = (email: string) : {emailIsValid: boolean, emailErrorMessage: string} => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
       return {emailIsValid: true, emailErrorMessage: ""};
    }
    
    return {emailIsValid: false, emailErrorMessage: "Invalid email address"}; 
};

export const validateUserName = (userName: string) : {usernameIsValid: boolean, usernameErrorMessage: string} => {
    if (userName.trim().length < 3 || userName.trim().length > 20) {
        return {usernameIsValid: false, usernameErrorMessage: "Username should be between 3-20 characters long"}; 
    }
    
    return {usernameIsValid: true, usernameErrorMessage: ""};
}

export const validatePassword = (password: string) : {passwordIsValid: boolean, passwordErrorMessage: string} => {
    if (password.trim().length < 6) {
        return {passwordIsValid: false, passwordErrorMessage: "Password should be at least 6 characters long"};
    } 

    return {passwordIsValid: true, passwordErrorMessage: ""};
}
  