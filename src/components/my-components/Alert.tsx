import React from "react";
import { View } from "react-native";
import { Modal, Portal, Button, Text, PaperProvider } from "react-native-paper";

interface AlertProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
}

const Alert: React.FC<AlertProps> = ({
                                                     visible,
                                                     onClose,
                                                     title = "Confirmation",
                                                     message = "Êtes-vous sûr de vouloir continuer ?",
                                                     confirmText = "Confirmer",
                                                     cancelText = "Annuler",
                                                     onConfirm,
                                                 }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={onClose}
                contentContainerStyle={{
                    backgroundColor: "white",
                    padding: 20,
                    margin: 20,
                    borderRadius: 10,
                    elevation: 5, // Ombre pour Android
                    shadowColor: "#000", // Ombre pour iOS
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                }}
            >
                <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
                    {title}
                </Text>
                <Text style={{ textAlign: "center", fontSize: 16, color: "gray", marginBottom: 20 }}>
                    {message}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Button mode="outlined" onPress={onClose}>
                        {cancelText}
                    </Button>
                    <Button mode="contained" onPress={onConfirm} color="red">
                        {confirmText}
                    </Button>
                </View>
            </Modal>
        </Portal>
    );
};

export default Alert;
