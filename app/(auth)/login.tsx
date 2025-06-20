import config from '@/config';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { API_PATH, APP_PATH } from '@/paths';
import PasswordField from '@/sections/auth/PasswordField';
import { saveUser } from '@/utils/AsyncStorageHelper';
import { addTokenToSecureStore, saveUserTokens } from '@/utils/SecureStoreHelper';
import axios from 'axios';
import { Href, useNavigation, useRouter } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const navigation = useNavigation();
    const { login } = useAuth()

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        try {
            const response = await axios.post(config.backendBaseUrl + API_PATH.auth.login, {
                email,
                password,
            });

            const { user, device } = response.data
            login(user, device.accessToken)

            Alert.alert('Success', 'Logged in!');
            router.replace(APP_PATH.private.profile as Href);
        } catch (error: any) {
            console.error('Login error:', error);
            const message =
                error.response?.data?.message || 'Something went wrong. Please try again.';
            Alert.alert('Login Failed', message);
        }
    };

    const handleSignUpRedirect = () => {
        router.push(APP_PATH.auth.signup as Href);
    };

    return (

        <View style={styles.overlay}>
            <Text style={styles.title}>Welcome Back</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#ccc"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <PasswordField value={password} onChangeText={setPassword} />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignUpRedirect}>
                <Text style={styles.signUpText}>
                    Don't have an account? <Text style={styles.link}>Sign Up</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.primary.main,
        textAlign: 'center',
        marginBottom: 32,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 14,
        backgroundColor: '#fff',
        color: '#333',
    },
    loginButton: {
        backgroundColor: Colors.primary.main,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    signUpText: {
        textAlign: 'center',
        color: 'black',
    },
    link: {
        fontWeight: '600',
        color: "black"
    },
});
