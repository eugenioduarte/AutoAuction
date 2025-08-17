import { useTheme } from '@/src/hooks/useTheme'
import { t } from '@/src/locales'
import { navigatorManager } from '@/src/navigation/navigatorManager'
import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import HeaderDetails from './HeaderDetails'

jest.mock('@/src/hooks/useTheme', () => ({
  useTheme: jest.fn(),
}))

jest.mock('@/src/navigation/navigatorManager', () => ({
  navigatorManager: { goBack: jest.fn() },
}))

jest.mock('@/src/locales', () => ({
  t: jest.fn(),
}))

jest.mock('@/assets/icons', () => ({
  Chevron: () => 'Chevron',
  FavoriteIcon: () => 'FavoriteIcon',
}))

describe('HeaderDetails', () => {
  const mockTheme = {
    spacings: { small: 4, large: 8, xLarge: 16 },
    colors: { primary: 'blue', grey: 'grey' },
    typography: {
      bodySmall: { fontSize: 12, lineHeight: 16 },
    },
  }

  beforeEach(() => {
    ;(useTheme as jest.Mock).mockReturnValue(mockTheme)
    ;(t as jest.Mock).mockImplementation((key) => key)
    jest.clearAllMocks()
  })

  it('renders addToFavorites text when not favourite', () => {
    const { getByText } = render(
      <HeaderDetails isFavourite={false} onToggleFavourite={jest.fn()} />,
    )
    expect(getByText('HeaderDetails.addToFavorites')).toBeTruthy()
  })

  it('renders removeFromFavorites text when favourite', () => {
    const { getByText } = render(
      <HeaderDetails isFavourite={true} onToggleFavourite={jest.fn()} />,
    )
    expect(getByText('HeaderDetails.removeFromFavorites')).toBeTruthy()
  })

  it('calls navigatorManager.goBack when back button is pressed', () => {
    const { getByTestId } = render(
      <HeaderDetails isFavourite={false} onToggleFavourite={jest.fn()} />,
    )
    fireEvent.press(getByTestId('header-back-button'))
    expect(navigatorManager.goBack).toHaveBeenCalled()
  })

  it('calls onToggleFavourite when favourite button is pressed', () => {
    const onToggleFavourite = jest.fn()
    const { getByTestId } = render(
      <HeaderDetails
        isFavourite={false}
        onToggleFavourite={onToggleFavourite}
      />,
    )
    fireEvent.press(getByTestId('header-fav-button'))
    expect(onToggleFavourite).toHaveBeenCalled()
  })
  it('applies grey color when not favourite', () => {
    const { getByText } = render(
      <HeaderDetails isFavourite={false} onToggleFavourite={jest.fn()} />,
    )
    const text = getByText('HeaderDetails.addToFavorites')
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'grey' })]),
    )
  })

  it('applies primary color when favourite', () => {
    const { getByText } = render(
      <HeaderDetails isFavourite={true} onToggleFavourite={jest.fn()} />,
    )
    const text = getByText('HeaderDetails.removeFromFavorites')
    expect(text.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: 'blue' })]),
    )
  })
})
