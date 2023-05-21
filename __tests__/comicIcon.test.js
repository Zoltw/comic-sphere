import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ComicIcon from '../components/ComicIcon';


describe('ComicIcon', () => {
  const onPressMock = jest.fn();

  const comicProps = {
    title: 'Noise Filter',
    img: 'https://imgs.xkcd.com/comics/noise_filter.png',
    comicId: '2777',
    onPress: onPressMock,
  };

  test('renders image with correct source', () => {
    const { getByTestId } = render(<ComicIcon {...comicProps} />);
    const img = getByTestId('comic-image');
    expect(img.props.source.uri).toBe(comicProps.img);
  });
  

  test('calls onPress when pressed', () => {
    const { getByTestId } = render(<ComicIcon {...comicProps} />);

    fireEvent.press(getByTestId('comic-icon'));
    expect(onPressMock).toHaveBeenCalledWith(comicProps.comicId);
  });
});
