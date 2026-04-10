import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { I18nextProvider } from "react-i18next";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import i18n from "./i18n";
import { Settings } from "./src/screens/Settings/Settings";
import UserList from "./src/screens/UserList/UserList";
import { UserInfo } from "./src/screens/UserInfo/UserInfo";
import { UserForm } from "./src/screens/UserForm/UserForm";
import { persistor, store } from "./src/store/store";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserListStack = createNativeStackNavigator();

const UserListStackScreen = () => {
  return (
    <UserListStack.Navigator>
      <UserListStack.Screen name="UserList" component={UserList} />
      <UserListStack.Screen name="UserInfo" component={UserInfo} />
    </UserListStack.Navigator>
  );
};

const NavigationWrapper = () => {
  const loggedInAs = useSelector((state) => state.auth.loggedInAs);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="UserListStack"
          component={UserListStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="UserForm" component={UserForm} />
        {loggedInAs && (
          <Tab.Screen
            name="LoggedInUserInfo"
            component={UserInfo}
            options={{
              title: `${loggedInAs.firstName} ${loggedInAs.lastName}`,
            }}
          />
        )}
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');

  const handleAddPost = () => {
    setPosts([...posts, input]);
    setInput('');
  };

  const handleDeletePost = (index) => {
    setPosts(posts.filter((post, i) => i !== index));
  };

  return (
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <NavigationWrapper />
          </I18nextProvider>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Skriv ett inlägg"
            />
            <Button title="Lägg till inlägg" onPress={handleAddPost} />
            <ScrollView>
              {posts.map((post, index) => (
                <View key={index}>
                  <Text>{post}</Text>
                  <Button title="x" onPress={() => handleDeletePost(index)} />
                </View>
              ))}
            </ScrollView>
          </View>
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
});

export default App;
