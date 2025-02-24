import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { Button as PaperButton, ButtonProps } from 'react-native-paper'

interface CustomButtonProps extends ButtonProps {
  mode?: 'text' | 'outlined' | 'contained' // Possible values for mode
  style?: ViewStyle | ViewStyle[] // Typing style as ViewStyle or an array of ViewStyles
}

const Button: React.FC<CustomButtonProps> = ({ mode, style, ...props }) => {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: 'white' },
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})

export default Button
