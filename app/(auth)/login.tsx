import { useLayoutEffect, useState } from 'react';
import {
    Alert,
    Button,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import PasswordField from '@/sections/auth/PasswordField';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const navigation = useNavigation();


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Login',
            headerBackTitle: 'Back',
        });
    }, [navigation]);

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        // TODO: Replace with actual API call
        console.log('Logging in with:', email, password);

        Alert.alert('Success', 'Logged in!');
        router.replace('/');
    };

    const handleSignUpRedirect = () => {
        router.push('/signup'); // Adjust route as needed
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
