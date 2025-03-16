import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import InFolderScreen from "./src/screens/InFolderScreen";
import { MMKV } from "react-native-mmkv";
import NoteScreen from "./src/screens/NoteScreen";

const Stack = createNativeStackNavigator<CommonType.RootStackParamList>();
export const noteStorage = new MMKV({id: 'note-storage'});
export const folderStorage = new MMKV({id: 'folder-storage'});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="InFolder" component={InFolderScreen}/>
        <Stack.Screen name="Note" component={NoteScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;