import UrlContainer from './UrlContainer';
import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, fireEvent } from '@testing-library/react';

describe('UrlContainer', () => {
  const mockDeletePost = jest.fn();
  const mockUrls = [
    {id: 0, long_url: 'www.thisisalongurl1.com', short_url: 'www.shorturl.com', title: 'My First Url'},
    { id: 1, long_url: 'www.thisisalongurl2.com', short_url: 'www.shorturl2.com', title: 'My Second Url'},
  ]

  afterEach(cleanup)

  it('should render the correct content', () => {
    const { getAllByText, getByText } = render(
      <UrlContainer urls={mockUrls} deletePost={mockDeletePost} />
    )

    const firstTitle = getByText('My First Url');
    const firstLongUrl = getByText('www.thisisalongurl1.com');
    const firstShortUrl = getByText('www.shorturl.com');
    const secondTitle = getByText('My Second Url');
    const secondLongUrl = getByText('www.thisisalongurl2.com');
    const secondShortUrl = getByText('www.shorturl2.com');
    const deleteButtons = getAllByText('Delete');

    expect(firstTitle).toBeInTheDocument();
    expect(firstLongUrl).toBeInTheDocument();
    expect(firstShortUrl).toBeInTheDocument();
    expect(secondTitle).toBeInTheDocument();
    expect(secondLongUrl).toBeInTheDocument();
    expect(secondShortUrl).toBeInTheDocument();
    expect(deleteButtons).toHaveLength(2);
  });

  it('should invoke the delete function with the correct arguments', () => {
    const { getAllByText } = render(
      <UrlContainer urls={mockUrls} deletePost={mockDeletePost} />
    )

    const deleteButton = getAllByText('Delete');
    fireEvent.click(deleteButton[0]);

    expect(mockDeletePost).toHaveBeenCalled();
    expect(mockDeletePost).toHaveBeenCalledWith(0);
  });
})