import {AsyncStorage, Alert} from 'react-native';

export function storeSession(session) {
    try {
      AsyncStorage.setItem("@Login:session", JSON.stringify(session)).then(() => {
        console.log('Session stored');
      })
    }
    catch (err) {
      console.error(err);
      Alert.alert("Unexpected", "Could not store token");
    }
  }