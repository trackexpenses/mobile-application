import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

interface IPasswordField {
    value: string,
    onChangeText: (value: string) => void,
    placeHolder?: string
}
export default function PasswordField({ value, onChangeText, placeHolder }: IPasswordField) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={styles.passwordContainer}>
            <TextInput
                style={styles.input}
                placeholder={placeHolder ?? "Password"}
                placeholderTextColor="#ccc"
                secureTextEntry={!showPassword}
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)} style={styles.toggle}>
                <Ionicons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#888"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    passwordContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 14,
        backgroundColor: '#fff',
        color: '#333',
        paddingRight: 60,
    },
    toggle: {
        position: 'absolute',
        right: 14,
        top: 14,
    },
});
