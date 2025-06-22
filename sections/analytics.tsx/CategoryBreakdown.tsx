import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { IChartSlice } from "./types";

interface ICategoryBreakDown {
    selectedLabel: IChartSlice
    setSelectedLabel: (value: IChartSlice | null) => void
}

export default function CategoryBreakDown({ selectedLabel, setSelectedLabel }: ICategoryBreakDown) {
    const summary = selectedLabel.children && selectedLabel.children.length > 0 && selectedLabel.children[0].tags[0] !== 'other'
        ? selectedLabel.children
        : [{ tags: ['Total'], amount: selectedLabel.total }]

    return (
        <View
            style={{
                marginTop: 20,
                paddingVertical: 30,
                paddingHorizontal: 10,
                borderRadius: 12,
                backgroundColor: '#f0f0f0',
                width: 320,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
                position: 'relative',
            }}
        >
            <Ionicons
                name="close"
                size={24}
                color="#333"
                style={{ position: 'absolute', top: 8, right: 12 }}
                onPress={() => setSelectedLabel(null)}
            />

            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                Breakdown for: {selectedLabel?.label}
            </Text>

            <View style={{ width: '100%', marginTop: 10 }}>
                {summary.map((expense, index) => {
                    const tags = expense.tags.filter(tag => tag !== selectedLabel.label).join(',');
                    return (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 12,
                                backgroundColor: '#e9e9e9',
                                borderRadius: 6,
                                marginBottom: 6,
                            }}
                        >
                            <Text style={{ fontWeight: 'bold', color: '#000' }}>{expense.amount.toLocaleString()} EGP</Text>
                            <View>
                                {expense.tags.length > 0 && <Text style={{ fontWeight: '600', color: '#333' }}>{tags}</Text>}
                                {expense.description && <Text style={{ fontWeight: '600', color: '#333' }}>{expense.description}</Text>}
                            </View>
                        </View>
                    );
                })}
            </View>
        </View >
    )
}
