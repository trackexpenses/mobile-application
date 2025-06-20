import { useLayoutEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import PasswordField from '@/sections/auth/PasswordField';

export default function SignupScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signup',
            headerBackTitle: 'Back',
        });
    }, [navigation]);

    const handleSignUp = () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        // TODO: Replace with actual API call
        console.log('Signing up with:', name, email, password);
        Alert.alert('Success', 'Account created!');
        router.replace('/');
    };

    const handleLoginRedirect = () => {
        router.push('/(auth)/login');
    };

    return (
        <View style={styles.overlay}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#ccc"
                value={name}
                onChangeText={setName}
            />

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
            <PasswordField value={confirmPassword} onChangeText={setConfirmPassword} placeHolder='Confirm Password' />

            <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                <Text style={styles.loginButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLoginRedirect}>
                <Text style={styles.signUpText}>
                    Already have an account? <Text style={styles.link}>Login</Text>
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
        color: 'black',
    },
});
