import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function AccountScreen({handleLogout}) {
  

  const userInfo = {
    name: "Nguyễn Quốc Trọng",
    email: "nqtrong@gmail.com",
    address: "TP.HCM",
  };

    return (
      <View style={styles.loggedInContainer}>
        <Text style={[styles.welcomeText]}>Welcome, {userInfo.name}!</Text>
        <Text style={styles.userInfoText}>Email: {userInfo.email}</Text>
        <Text style={styles.userInfoText}>Address: {userInfo.address}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  loggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    color: '#333',
  },
  userInfoText: {
    fontSize: 18,
    color: '#333',
    margin: 5,
  },
  tokenText: {
    fontSize: 16,
    color: '#555',
    margin: 10,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#de5246',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});
