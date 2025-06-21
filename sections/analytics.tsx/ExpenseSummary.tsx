import { StyleSheet, Text, View } from "react-native";
import { ICategorySummary } from "./types";
import { Colors } from "@/constants/Colors";

export default function ExpenseSummary({ summary }: { summary: ICategorySummary[] }) {
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

            {summary.map((tag, index) => (
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
                        {tag.value} EGP
                    </Text>
                    <Text style={{ fontSize: 16, color: '#333' }}>{tag.category}</Text>
                </View>
            ))}
        </View>

    )
}
