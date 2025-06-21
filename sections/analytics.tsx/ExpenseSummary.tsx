import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { IExpense } from "../myExpenses/types";
import { IChartSlice } from "./types";

export default function ExpenseSummary({ summary }: { summary: IChartSlice[] }) {
    return (
        <View
            style={{
                width: '100%',
                margin: 20,
                padding: 16,
            }}
        >
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 12,
                    color: Colors.primary.main,
                }}
            >
                Expenses Summary
            </Text>

            {summary.map((expense, index) => (
                <View
                    key={index}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingVertical: 12,
                        paddingHorizontal: 10,
                        backgroundColor: '#f9f9f9',
                        borderRadius: 8,
                        marginBottom: 8,
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.primary.main }}>
                        {expense.total} EGP
                    </Text>
                    <Text style={{ fontSize: 16, color: '#333' }}>{expense.label}</Text>
                </View>
            ))}
        </View>

    )
}
