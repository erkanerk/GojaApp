import React, { useContext } from "react";
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
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
          <Icon.Button
              name="log-out"
              color='black'
              size={40}
              backgroundColor="transparent"
              borderRadius={0}
              onPress={logout}
              underlayColor="white"
            >
        </Icon.Button>
      </View>
    );
  }

