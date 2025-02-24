
import React from "react";
import { Text, View, StyleSheet } from "react-native";

type BadgeProps = {
    type: "default" | "dark" | "red" | "green" | "yellow" | "indigo" | "purple" | "pink";
    message: string;
};

const badgeColors: Record<BadgeProps["type"], { backgroundColor: string; borderColor: string; textColor: string }> = {
    default: { backgroundColor: "#DBEAFE", borderColor: "#3B82F6", textColor: "#1E40AF" },
    dark: { backgroundColor: "#E5E7EB", borderColor: "#6B7280", textColor: "#374151" },
    red: { backgroundColor: "#FEE2E2", borderColor: "#EF4444", textColor: "#B91C1C" },
    green: { backgroundColor: "#D1FAE5", borderColor: "#10B981", textColor: "#065F46" },
    yellow: { backgroundColor: "#FEF9C3", borderColor: "#FACC15", textColor: "#A16207" },
    indigo: { backgroundColor: "#E0E7FF", borderColor: "#6366F1", textColor: "#4338CA" },
    purple: { backgroundColor: "#E9D5FF", borderColor: "#A855F7", textColor: "#6B21A8" },
    pink: { backgroundColor: "#FCE7F3", borderColor: "#EC4899", textColor: "#9D174D" },
};

const Badge: React.FC<BadgeProps> = ({ type, message }) => {
    const colors = badgeColors[type];

    return (
        <View style={[styles.badge, { backgroundColor: colors.backgroundColor, borderColor: colors.borderColor }]}>
            <Text style={[styles.text, { color: colors.textColor }]}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        alignSelf: "flex-start",
    },
    text: {
        fontSize: 12,
        fontWeight: "500",
    },
});

export default Badge;