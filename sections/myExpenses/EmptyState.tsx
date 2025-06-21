import { View, Text, StyleSheet, Image } from "react-native";

export default function EmptyState() {
    return (
        <View style={emptyStateStyles.emptyContainer}>
            <Image source={require('@/assets/images/app-logo.png')} style={emptyStateStyles.image} />
            <Text style={emptyStateStyles.emptyText}>{'No expenses yet'}.</Text>
        </View>
    )
}

export const emptyStateStyles = StyleSheet.create({
    emptyContainer: {
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 160,
        height: 160,
        resizeMode: 'contain',
        marginBottom: 24,
    },
    emptyText: {
        textAlign: 'center',
        color: '#999',
        marginTop: 40,
        fontSize: 16,
    },
});