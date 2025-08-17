import { render } from '@testing-library/react-native'
import React from 'react'
import ImageCar from './ImageCar'

jest.mock('@/src/hooks/useTheme', () => ({
  useTheme: () => ({
    spacings: { small: 10 },
    border: { radius: 5 },
  }),
}))

jest.mock('@/src/constants/placeholders', () => ({
  placeholders: {
    CAR_PLACEHOLDER_IMAGE: 'https://example.com/car.png',
  },
}))

jest.mock('@/src/constants/sizes', () => ({
  sizes: {
    IMAGE_CAR_SIZE: 100,
  },
}))

describe('ImageCar', () => {
  it('renders Image with correct default dimensions and source', () => {
    const { getByTestId } = render(<ImageCar />)
    const image = getByTestId('car-image')

    expect(image.props.source.uri).toBe('https://example.com/car.png')
    expect(image.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ marginRight: 10, borderRadius: 5 }),
        expect.objectContaining({ width: 100, height: 100 }),
      ]),
    )
  })

  it('applies custom width, height and style', () => {
    const customStyle = { backgroundColor: 'red' }
    const { getByTestId } = render(
      <ImageCar width={150} height={200} style={customStyle} />,
    )
    const image = getByTestId('car-image')

    expect(image.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ marginRight: 10, borderRadius: 5 }),
        expect.objectContaining({ width: 150, height: 200 }),
        customStyle,
      ]),
    )
  })
})
