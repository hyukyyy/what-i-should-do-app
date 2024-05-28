import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {theme} from '../style/themes/theme.ts';

export default function Button({mode, style, children, ...props}: any) {
  return (
    <PaperButton
      style={[styles.button, {backgroundColor: theme.colors.primary}, style]}
      labelStyle={styles.text}
      mode={mode}
      {...props}>
      {children}
    </PaperButton>
  );
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
});
