import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

interface ToastProps {
    message: string;
    type: 'info' | 'success' | 'error'; // Type du toast pour gérer les couleurs
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
    const [visible, setVisible] = useState(false);
    const [toastShown, setToastShown] = useState(false); // État pour vérifier si le toast a été montré
    const fadeAnim = new Animated.Value(0); // Valeur pour l'animation d'apparition/disparition

    useEffect(() => {
        if (toastShown) return; // Si le toast a déjà été montré, on ne fait rien

        // Affichage du toast
        setVisible(true);

        // Animation d'apparition
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();

        // Fermeture automatique après 3 secondes
        const timer = setTimeout(() => {
            // Animation de disparition
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();

            // Cacher le toast après animation
            setTimeout(() => {
                setVisible(false);
                setToastShown(true); // Marquer comme toast affiché
            }, 500);
        }, 3000);

        return () => clearTimeout(timer); // Nettoyer le timer
    }, [fadeAnim, toastShown]);

    // Styles selon le type (info, success, error)
    const getToastStyle = () => {
        switch (type) {
            case 'info':
                return styles.info;
            case 'success':
                return styles.success;
            case 'error':
                return styles.error;
            default:
                return styles.info;
        }
    };

    if (!visible) return null; // Ne pas afficher si invisible

    return (
        <Animated.View style={[styles.toastContainer, getToastStyle(), { opacity: fadeAnim }]}>
            <Text style={styles.icon}>ℹ️</Text>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Info Alert</Text>
                <Text style={styles.message}>{message}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        position: 'absolute',
        top: 20,
        left: '10%',
        right: '10%',
        zIndex: 1000,
    },
    info: {
        backgroundColor: '#e0f7fa',
        borderColor: '#81d4fa',
        borderWidth: 1,
    },
    success: {
        backgroundColor: '#e8f5e9',
        borderColor: '#81c784',
        borderWidth: 1,
    },
    error: {
        backgroundColor: '#ffebee',
        borderColor: '#f44336',
        borderWidth: 1,
    },
    icon: {
        fontSize: 20,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14,
    },
});

export default Toast;
