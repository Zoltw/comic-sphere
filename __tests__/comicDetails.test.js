import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { useComic } from '../api/comicsService';
import ComicDetails from '../screens/ComicDetails';

jest.mock('../api/comicsService');

const mockComic = {
  title: 'Crystal Ball',
  img: 'https://imgs.xkcd.com/comics/crystal_ball.png',
  alt: 'They often use ball lenses to collect light at the ends of optical fibers, so when you look stuff up on the internet you\'re actually scrying through a crystal ball.',
  transcript: 'Test Transcript',
};

test('displays the correct comic details', async () => {
  useComic.mockReturnValue({
    data: mockComic,
    isLoading: false,
  });

  const mockRoute = { params: { comicId: '2776' } };

  const { getByText } = render(<ComicDetails route={mockRoute} />);

  await waitFor(() => getByText(mockComic.title));
  
  expect(getByText(mockComic.alt)).toBeTruthy();
});
