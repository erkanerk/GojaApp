export interface IFormErrors {
    emailErrorMessage?: string;
    passwordErrorMessage?: string;
}

export const emptyFormErrors = (): IFormErrors => {
    return {
        emailErrorMessage: '',
        passwordErrorMessage: ''
    }
}

export const validateForm = (email: string, password: string) : {isValid: boolean, formErrors: IFormErrors} => {
    const {emailIsValid, emailErrorMessage} = validateEmail(email);
    const {passwordIsValid, passwordErrorMessage} = validatePassword(password);

    if (emailIsValid && passwordIsValid) {
        return {isValid: true, formErrors: emptyFormErrors()}
    } 
    return {isValid: false, formErrors: {emailErrorMessage: emailErrorMessage, passwordErrorMessage: passwordErrorMessage}}
}

const validateEmail = (email: string) : {emailIsValid: boolean, emailErrorMessage: string} => {
    if (email.trim().length < 1) {
        return {emailIsValid: false, emailErrorMessage: "Please enter email"}; 
    }
    return {emailIsValid: true, emailErrorMessage: ""};
}

const validatePassword = (password: string) : {passwordIsValid: boolean, passwordErrorMessage: string} => {
    if (password.trim().length < 1) {
        return {passwordIsValid: false, passwordErrorMessage: "Please enter password"};
    } 
    return {passwordIsValid: true, passwordErrorMessage: ""};
}
  