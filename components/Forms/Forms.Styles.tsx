import { StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    input: {
      width: 200,
      height: 30,
      borderRadius: 20,
      paddingLeft: 15,
      backgroundColor: '#fff',
    },
    faultyInput: {
        borderWidth: 2,
        borderColor: 'red',
    },
    errorMessage: {
        color: 'red',
        marginLeft: 5,
    },
    formWrapper: {
        marginBottom: 40
    },
    inputField: {
        width: 200,
        marginBottom: 15,
    }
});