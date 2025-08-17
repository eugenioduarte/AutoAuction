import { render } from '@testing-library/react-native'
import React from 'react'
import Badge from './Badge'

jest.mock('@/src/hooks/useTheme', () => ({
  useTheme: () => ({
    colors: {
      tertiary: '#FF0000',
      surface: '#FFFFFF',
    },
    spacings: {
      small: 8,
      xSmall: 4,
      large: 24,
    },
    border: {
      radius: 4,
    },
    typography: {
      bodySmall: { fontSize: 12, lineHeight: 16 },
    },
  }),
}))
describe('Badge Component', () => {
  it('renders the title correctly', () => {
    const title = 'Test Badge'
    const { getByText } = render(<Badge title={title} />)
    expect(getByText(title)).toBeTruthy()
  })
})
