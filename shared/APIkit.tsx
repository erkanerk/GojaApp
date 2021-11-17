import axios from 'axios';
import Constants from "expo-constants";
const { manifest } = Constants;

export const APIKit = axios.create({
    //Fetches IP address of host where the server is running locally in order to be able to run from phones (since localhost won't work). 
    //TODO: Change to official hostname when we have one
    baseURL: `http://${manifest?.debuggerHost?.split(':').shift()}:3000`,
    timeout: 10000,
});

//Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
    APIKit.interceptors.request.use((config) => {
      config.headers = {
        Authorization: `Bearer ${token}`
      };
      return config;
    });
};