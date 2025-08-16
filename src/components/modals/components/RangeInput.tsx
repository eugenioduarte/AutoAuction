import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme.type'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import TextInput from '../../textInput/TextInput'
import Section from './Section'

const RangeInput = ({
  title,
  value,
  setValue,
}: {
  title: string
  value: [string, string]
  setValue: (val: [string, string]) => void
}) => {
  const theme = useTheme()
  const styles = getStyles(theme)
  return (
    <Section title={title}>
      <View style={styles.row}>
        <TextInput
          value={value[0]}
          onChangeText={(text) => setValue([text, value[1]])}
          placeholder="Mínimo"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          value={value[1]}
          onChangeText={(text) => setValue([value[0], text])}
          placeholder="Máximo"
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
    </Section>
  )
}

export default RangeInput

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    section: { marginBottom: theme.spacings.medium },
    row: { flexDirection: 'row', gap: theme.spacings.small },
    input: {
      flex: 1,
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: theme.spacings.small,
    },
  })
