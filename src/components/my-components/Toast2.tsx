import React, { useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

interface Toast2Props {
    visible: boolean;
    message: string;
    type?: "success" | "error" | "warning";
    onDismiss: () => void;
    duration?: number;
}

const Toast2: React.FC<Toast2Props> = ({
                                                     visible,
                                                     message,
                                                     type = "success",
                                                     onDismiss,
                                                     duration = 3000,
                                                 }) => {
    const fadeAnim = new Animated.Value(visible ? 1 : 0);

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => onDismiss());
            }, duration);
        }
    }, [visible]);

    if (!visible) return null;

    const toastStyles = {
        success: { bgColor: "#D1FAE5", textColor: "#065F46", icon: "check-circle" },
        error: { bgColor: "#FEE2E2", textColor: "#B91C1C", icon: "error" },
        warning: { bgColor: "#FEF9C3", textColor: "#B45309", icon: "warning" },
    };

    return (
        <Animated.View
            style={{
                position: "absolute",
                bottom: 50,
                alignSelf: "center",
                backgroundColor: toastStyles[type].bgColor,
                padding: 15,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                elevation: 5,
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                opacity: fadeAnim,
            }}
        >
            <MaterialIcons name={toastStyles[type].icon} size={24} color={toastStyles[type].textColor} />
            <Text style={{ marginLeft: 10, color: toastStyles[type].textColor }}>{message}</Text>
            <Button onPress={onDismiss} compact>
                ✖
            </Button>
        </Animated.View>
    );
};

export default Toast2;