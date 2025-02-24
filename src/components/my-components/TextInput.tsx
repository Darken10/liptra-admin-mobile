import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input, TextInputProps } from 'react-native-paper'
import  Colors  from '@/src/constants/Colors'



interface Props extends TextInputProps  {
  errorText? :string,
  description? : string
}
export default function TextInput({ errorText, description, ...props }:Props) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={Colors.light.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: Colors.light.surface,
  },
  description: {
    fontSize: 13,
    color: Colors.light.secondary,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: Colors.light.error,
    paddingTop: 8,
  },
})
