import { Feather } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View } from 'react-native';
import { clearUserSession, getToken } from '../../shared/APIkit';
import AppContext from "../../shared/AppContext";

export const LogoutButton = () => {

    const globalCtx = useContext(AppContext);
    
    async function logout() {
        await clearUserSession();
        globalCtx.setLoggedIn(false);
    }
  
    return (
      <View>
        <Feather name={'log-out'} size={30} color={'black'} onPress={logout}/>
      </View>
    );
  }

