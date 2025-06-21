import { Text, View } from "react-native";

interface ITotalExpensesText {
    total: number
    chartSize: any
}
export default function TotalExpensesText({ chartSize, total }: ITotalExpensesText) {
    return (
        <View
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>EGP</Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{Math.round(total / 1000)}K</Text>
        </View>
    )
}