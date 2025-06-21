import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { parseExpenseInput } from '@/utils/parseExpenseInput';
import config from '@/config';
import axios from 'axios';
import { API_PATH } from '@/paths';
import { AuthTokens, getTokenFromSecureStore } from '@/utils/SecureStoreHelper';
import { IExpense } from '@/sections/myExpenses/types';
import ExpensesList from '@/sections/myExpenses/ExpensesList';
import EmptyState from '@/sections/myExpenses/EmptyState';
import LoadingState from '@/sections/myExpenses/LoadingState';
import AddExpenseModal from '@/sections/myExpenses/AddExpenseModal';

export default function AddExpenseScreen() {
    const [expense, setExpense] = useState('');
    const [expenses, setExpenses] = useState<IExpense[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const token = await getTokenFromSecureStore(AuthTokens.ACCESS_TOKEN);
                const response = await axios.get(
                    config.backendBaseUrl + API_PATH.expenses.root,
                    {
                        headers: {
                            Authorization: token,
                        }
                    }
                );

                const { expenses } = response.data;
                setExpenses(expenses);
                setLoading(false)
            } catch (error: any) {
                console.error('Failed to fetch expenses:', error?.response?.data || error.message);
                setLoading(false)
            }
        };

        fetchExpenses();
    }, []);

    if (loading) {
        return <LoadingState />
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                {expenses.length === 0 ? (
                    <EmptyState />
                ) : (
                    <ExpensesList expenses={expenses} />
                )}

                {!isAdding && (
                    <TouchableOpacity style={styles.fab} onPress={() => setIsAdding(true)}>
                        <Ionicons name="add" size={32} color="#fff" />
                    </TouchableOpacity>
                )}

                <AddExpenseModal
                    isAdding={isAdding}
                    setIsAdding={setIsAdding}
                    setExpense={setExpense}
                    expense={expense}
                    setExpenses={setExpenses}
                />
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

});