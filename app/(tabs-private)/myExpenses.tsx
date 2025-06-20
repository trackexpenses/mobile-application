import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { parseExpenseInput } from '@/utils/parseExpenseInput';
import config from '@/config';
import axios from 'axios';
import { API_PATH } from '@/paths';
import { AuthTokens, getTokenFromSecureStore } from '@/utils/SecureStoreHelper';


type Expense = {
    id: string;
    amount: number;
    description?: string
    tags: string[]
};

export default function AddExpenseScreen() {
    const [expense, setExpense] = useState('');
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddExpense = async () => {
        const { amount, description, tags } = parseExpenseInput(expense)

        if (isNaN(amount) || amount <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid positive number');
            return;
        }

        const newExpense = {
            id: Date.now().toString(),
            amount,
            description,
            tags
        };
        try {
            const response = await axios.post(
                config.backendBaseUrl + API_PATH.expenses.root,
                newExpense,
                {
                    headers: {
                        Authorization: await getTokenFromSecureStore(AuthTokens.ACCESS_TOKEN)
                    }
                }
            );

            Alert.alert('Success', 'Expense is added!');
            setExpenses(prev => [...prev, newExpense]);
            setExpense('');
            setIsAdding(false);

        } catch (error: any) {
            const message =
                error.response?.data?.message || 'Something went wrong. Please try again.';
            Alert.alert('Adding Expense Failed', message);
            setExpense('');
            setIsAdding(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>

                {expenses.length === 0 && !isAdding ? (
                    <View style={{
                        alignSelf: 'center',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image source={require('@/assets/images/app-logo.png')} style={styles.image} />
                        <Text style={styles.emptyText}>No expenses yet.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={expenses}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.expenseItem}>
                                <Text style={styles.expenseText}>
                                    EGP {item.amount.toFixed(2)}
                                </Text>
                                {item.description && <Text style={styles.descriptionText}>
                                    {item.description}
                                </Text>
                                }

                                <View style={styles.tagContainer}>
                                    {item.tags.map((tag: string) => (
                                        <View key={tag} style={styles.tag}>
                                            <Text style={styles.tagText}>{tag}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                    />

                )}

                {isAdding && (
                    <>
                        <Text style={styles.label}>Enter Expense Amount</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 400 #car #fuel"
                            value={expense}
                            onChangeText={setExpense}
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
                            <Text style={styles.buttonText}>Add Expense</Text>
                        </TouchableOpacity>
                    </>
                )}

                {!isAdding && (
                    <TouchableOpacity
                        style={styles.fab}
                        onPress={() => setIsAdding(true)}
                    >
                        <Ionicons name="add" size={32} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#f9f9f9',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.primary.main,
        marginBottom: 16,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 40,
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        marginTop: 20,
        marginBottom: 8,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        padding: 12,
        fontSize: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.primary.main,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    fab: {
        position: 'absolute',
        right: 24,
        bottom: 24,
        backgroundColor: Colors.primary.main,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    expenseItem: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    expenseText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.primary.main,
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 14,
        fontWeight: '400',
        marginBottom: 8,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        backgroundColor: '#e0e0e0',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 6,
        marginBottom: 6,
    },
    tagText: {
        fontSize: 12,
        color: '#555',
    },
    image: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
        marginBottom: 24,
    },
});
