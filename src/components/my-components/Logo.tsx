import React from 'react'
import {Image, StyleSheet} from 'react-native'


export default function Logo() {
    return <Image source={require('@/assets/images/logo.jpg')} style={styles.image} />
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        position : 'relative',
        marginBottom: 8,
    },
})