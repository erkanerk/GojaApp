import axios from 'axios';
import Constants from "expo-constants";
const { manifest } = Constants;
import * as SecureStore from 'expo-secure-store';

export const APIKit = axios.create({
    //Fetches IP address of host where the server is running locally in order to be able to run from phones (since localhost won't work). 
    //TODO: Change to official hostname when we have one
    baseURL: `http://${manifest?.debuggerHost?.split(':').shift()}:3000`,
    timeout: 10000,
});

//Set JSON Web Token in Client to be included in all calls
const authInterceptor = APIKit.interceptors.request.use(async (config) => {
    const token = await getToken();
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    console.log(config.headers);
    return config;
});

export const saveUserSession = async (key, value) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

export const getToken = async () => {
  const credentials = await readUserSession();
  if (credentials) {
    return credentials.token;
  }
  return null;
}

export const readUserSession = async () => {
  const credentials = await SecureStore.getItemAsync('userSession');
  if (credentials) {
    return JSON.parse(credentials);
  }
  return null;
}

// Use when logging user out
export const clearUserSession = async () => {
  APIKit.interceptors.request.eject(authInterceptor);
  await SecureStore.deleteItemAsync('userSession');
  readUserSession;
}
