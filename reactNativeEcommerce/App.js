import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native'; // Removed unused StyleSheet import
import HomeScreen from './screen/HomeScreen';
import CartScreen from './screen/CartScreen';
import AccountScreen from './screen/AccountScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Header';
import LoginScreen from './screen/LoginScreen';

export default function App() {
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState(null); // Removed isLogin as it's redundant
  const [isLogin, setIsLogin] = useState(false);

  const handleUserLogin = (u) => {
    setUser(u);
  };

  const handleUserLogout = () => {
    setUser(null);
  };

  useEffect(()=>{
    if(user){
      setIsLogin(true)
    }
    else{
      setIsLogin(false);
    }
  })
  // Simplified rendering logic by directly checking user state
  return (
    <>
      <Header />
      <StatusBar hidden={true} />
      {isLogin ? ( // Check if user is logged in
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                const iconName = route.name === 'HomeScreen' ? 'home' :
                  route.name === 'CartScreen' ? 'shopping-cart' : 'user';
                const backgroundColor = focused ? '#ddd' : 'transparent';
                return (
                  <View style={{ width: 70, height: 40, borderRadius: 20, backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name={iconName} size={size} color={focused ? '#014778' : '#050505'} />
                  </View>
                );
              },
              headerShown: false,
              tabBarShowLabel: false,
              tabBarStyle: {
                display: 'flex',
                backgroundColor: '#66b2e8',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 10,
                paddingBottom: 10,
              }
            })}
          >
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="CartScreen" component={CartScreen} />
            <Tab.Screen name="AccountScreen">
              {() => <AccountScreen handleLogout={handleUserLogout} />}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <LoginScreen handleUserLogin={handleUserLogin} />
      )}
    </>
  );
}
