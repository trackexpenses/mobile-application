import config from "@/config";
import { API_PATH } from "@/paths";
import { parseExpenseInput } from "@/utils/parseExpenseInput";
import { getTokenFromSecureStore, AuthTokens } from "@/utils/SecureStoreHelper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Modal, View, TouchableOpacity, TextInput, Text, StyleSheet, Alert } from "react-native";
import { IExpense } from "./types";
import { Colors } from "@/constants/Colors";

interface IAddExpenseModal {
    isAdding: boolean
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>
    expense: string
    setExpense: React.Dispatch<React.SetStateAction<string>>
    setExpenses: React.Dispatch<React.SetStateAction<IExpense[]>>
}

export default function AddExpenseModal({ isAdding, setIsAdding, expense, setExpense, setExpenses }: IAddExpenseModal) {

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
        <Modal
            visible={isAdding}
            transparent
            animationType="slide"
            onRequestClose={() => setIsAdding(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsAdding(false)}
                    >
                        <Ionicons name="close" size={24} color="#555" />
                    </TouchableOpacity>

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
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
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
    label: {
        fontSize: 16,
        marginTop: 30,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 4,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 6,
    },
});