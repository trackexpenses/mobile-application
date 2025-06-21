import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { emptyStateStyles } from "./EmptyState";

export default function LoadingState() {
    return (
        <View style={emptyStateStyles.emptyContainer}>
            <ActivityIndicator size="large" color={Colors.primary.main} style={{ marginBottom: 20 }} />
            <Text style={emptyStateStyles.emptyText}>Fetching Expenses ...</Text>
        </View>
    )

}