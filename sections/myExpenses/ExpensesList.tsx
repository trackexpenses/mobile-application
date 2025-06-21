import { FlatList, View, Text, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { IExpense } from "./types";

export default function ExpensesList({ expenses }: { expenses: IExpense[] }) {
    return (
        <FlatList
            data={expenses}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View style={styles.expenseItem}>
                    <Text style={styles.expenseText}>EGP {item.amount.toFixed(2)}</Text>
                    {item.description && (
                        <Text style={styles.descriptionText}>{item.description}</Text>
                    )}
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
});