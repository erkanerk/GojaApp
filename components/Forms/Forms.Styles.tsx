import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
    },
    input: {
        width: 200,
        height: 30,
        borderRadius: 20,
        paddingLeft: 15,
        backgroundColor: "#fff",
    },
    faultyInput: {
        borderWidth: 2,
        borderColor: "pink",
    },
    errorMessage: {
        color: "pink",
        marginLeft: 5,
    },
    formWrapper: {
        marginBottom: 24,
    },
    inputField: {
        color: "black",
        width: 200,
        marginBottom: 15,
    },
    placeHolder: {
        color: "grey",
    },
});
