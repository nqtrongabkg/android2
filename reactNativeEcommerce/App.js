import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import HomeScreen from './screen/HomeScreen';
import CartScreen from './screen/CartScreen';
import AccountScreen from './screen/AccountScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Header';


export default function App() {
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState({});
  const handleUser = (u) => {
    setUser(u);
  }

  return (
    <>
    <Header/>
    <StatusBar hidden={true} />
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeScreen') { 
              iconName = 'home';
            } else if (route.name === 'CartScreen') {
              iconName = 'shopping-cart';
            } else if (route.name === 'AccountScreen') {
              iconName = 'user';
            }
            const backgroundColor = focused ? '#ddd' : 'transparent'; //
            return (
              <View style={{ width: 70, height: 40, borderRadius: 20, backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                <Icon name={iconName} size={size} color={focused ? '#014778' : '#050505'} />
              </View>
            );
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: [
            {
              display: 'flex',
              height: 60,
              backgroundColor: '#66b2e8',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            null
          ]
        })}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="CartScreen" component={CartScreen} />
        <Tab.Screen name="AccountScreen" component={AccountScreen} handleUser={handleUser} />
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
