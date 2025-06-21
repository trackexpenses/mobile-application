import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { IChartSlice } from "./types";

interface ICategoryBreakDown {
    selectedLabel: IChartSlice
    setSelectedLabel: (value: IChartSlice | null) => void
}

export default function CategoryBreakDown({ selectedLabel, setSelectedLabel }: ICategoryBreakDown) {
    const summary = selectedLabel.summary && selectedLabel.summary.length > 0
        ? selectedLabel.summary
        : [{ category: 'Total', value: selectedLabel.value }]

    return (
        <View
            style={{
                marginTop: 20,
                padding: 30,
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
                {(selectedLabel.summary && selectedLabel.summary.length > 0
                    ? selectedLabel.summary
                    : [{ category: 'Total', value: selectedLabel.value }]
                ).map((tag, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: 6,
                            paddingHorizontal: 12,
                            backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9e9e9',
                            borderRadius: 6,
                            marginBottom: 6,
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>{tag.value} EGP</Text>
                        <Text style={{ fontWeight: '600', color: '#333' }}>{tag.category}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}
