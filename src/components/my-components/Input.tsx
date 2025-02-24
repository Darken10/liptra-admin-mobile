import React from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    useColorScheme,
    TextInputProps,
} from 'react-native';

interface ValidatedInputProps extends TextInputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    status?: 'default' | 'success' | 'error';
    message?: string;
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({
                                                           label,
                                                           placeholder,
                                                           value,
                                                           onChangeText,
                                                           status = 'default',
                                                           message,
                                                           ...rest
                                                       }) => {
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';

    // Définition des styles par défaut
    let inputStyle = isDark ? styles.inputDarkDefault : styles.inputLightDefault;
    let labelStyle = isDark ? styles.labelDark : styles.label;
    let messageStyle = isDark ? styles.textDefaultDark : styles.textDefault;

    // Ajustement des styles en fonction de l'état
    if (status === 'success') {
        inputStyle = isDark ? styles.inputDarkSuccess : styles.inputLightSuccess;
        labelStyle = isDark ? styles.labelSuccessDark : styles.labelSuccess;
        messageStyle = isDark ? styles.textSuccessDark : styles.textSuccess;
    } else if (status === 'error') {
        inputStyle = isDark ? styles.inputDarkError : styles.inputLightError;
        labelStyle = isDark ? styles.labelErrorDark : styles.labelError;
        messageStyle = isDark ? styles.textErrorDark : styles.textError;
    }

    return (
        <View style={styles.container}>
            {label && <Text style={labelStyle}>{label}</Text>}
            <TextInput
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
                value={value}
                onChangeText={onChangeText}
                {...rest}
            />
            {message && <Text style={messageStyle}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    /* Styles des labels */
    label: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#1F2937', // Mode clair
    },
    labelDark: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF', // Mode sombre
    },
    labelSuccess: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#047857', // Mode clair succès
    },
    labelSuccessDark: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#10B981', // Mode sombre succès
    },
    labelError: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#B91C1C', // Mode clair erreur
    },
    labelErrorDark: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
        color: '#F87171', // Mode sombre erreur
    },
    /* Styles communs aux inputs */
    input: {
        borderWidth: 1,
        fontSize: 14,
        borderRadius: 8,
        padding: 10,
        width: '100%',
    },
    /* Etat par défaut */
    inputLightDefault: {
        backgroundColor: '#F9FAFB', // bg-gray-50
        borderColor: '#D1D5DB', // border-gray-300
        color: '#1F2937', // text-gray-900
    },
    inputDarkDefault: {
        backgroundColor: '#374151', // dark:bg-gray-700
        borderColor: '#4B5563', // dark:border-gray-600
        color: '#FFFFFF', // dark:text-white
    },
    /* Etat succès */
    inputLightSuccess: {
        backgroundColor: '#ECFDF5', // bg-green-50
        borderColor: '#10B981', // border-green-500
        color: '#065F46', // approximation pour text-green-900
    },
    inputDarkSuccess: {
        backgroundColor: '#374151', // dark:bg-gray-700
        borderColor: '#10B981', // dark:border-green-500
        color: '#10B981', // dark:text-green-400
    },
    /* Etat erreur */
    inputLightError: {
        backgroundColor: '#FEF2F2', // bg-red-50
        borderColor: '#EF4444', // border-red-500
        color: '#B91C1C', // text-red-900
    },
    inputDarkError: {
        backgroundColor: '#374151', // dark:bg-gray-700
        borderColor: '#EF4444', // dark:border-red-500
        color: '#F87171', // dark:text-red-500
    },
    /* Messages et textes par défaut */
    textDefault: {
        marginTop: 8,
        fontSize: 14,
        color: '#6B7280',
    },
    textDefaultDark: {
        marginTop: 8,
        fontSize: 14,
        color: '#9CA3AF',
    },
    /* Message succès */
    textSuccess: {
        marginTop: 8,
        fontSize: 14,
        color: '#059669', // text-green-600
    },
    textSuccessDark: {
        marginTop: 8,
        fontSize: 14,
        color: '#10B981', // dark:text-green-500
    },
    /* Message erreur */
    textError: {
        marginTop: 8,
        fontSize: 14,
        color: '#DC2626', // text-red-600
    },
    textErrorDark: {
        marginTop: 8,
        fontSize: 14,
        color: '#F87171', // dark:text-red-500
    },
});

export default ValidatedInput;
