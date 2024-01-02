import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ handleUserLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://fakestoreapi.com/auth/login', {
                username, // Assuming this is the correct API format
                password,
            });
            handleUserLogin({ username, token: response.data.token });
        } catch (error) {
            Alert.alert('Login failed', 'Check your username and password');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};
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
export default LoginScreen;