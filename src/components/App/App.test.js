import App from './App';
import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { getUrls, postUrl, removeUrl } from '../../apiCalls';

jest.mock('../../apiCalls')


describe('App', () => {
  const mockUrls = {
    urls: [
      { id: 0, long_url: 'www.thisisalongurl1.com', short_url: 'www.shorturl.com', title: 'My First Url' },
      { id: 1, long_url: 'www.thisisalongurl2.com', short_url: 'www.shorturl2.com', title: 'My Second Url' },
    ]
  }
  const mockNewPost = { id: 2, long_url: 'www.thisisalongurl3.com', short_url: 'www.shorturl3.com', title: 'My Third Url' }
  
  getUrls.mockResolvedValue(mockUrls);
  postUrl.mockResolvedValue(mockNewPost);

  it('should render the correct content', () => {

    const { getByText, getByPlaceholderText } = render(
      <App />
    )

    const appTitle = getByText('URL Shortener');
    const noUrlsWarning = getByText('No urls yet! Find some to shorten!')

    expect(appTitle).toBeInTheDocument();
    expect(noUrlsWarning).toBeInTheDocument();

    const titleInput = getByPlaceholderText('Title...');
    const urlInput = getByPlaceholderText('URL to Shorten...');
    const submitButton = getByText('Shorten Please!');

    expect(titleInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  })

  it('should render the correct content when there are posts stored in the backend', async () => {

    const { getByText, getAllByText } = await render(
      <App />
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
  })

  it('should allow users to fill out a new url post and see it appear on the DOM', async () => {
    
    const { getByText, getByPlaceholderText } = render(
      <App />
    )

    const titleInput = getByPlaceholderText('Title...');
    const urlInput = getByPlaceholderText('URL to Shorten...');
    const submitButton = getByText('Shorten Please!');

    fireEvent.change(titleInput, { target: { value: 'My Third Url' } });
    fireEvent.change(urlInput, { target: { value: 'www.thisisalongurl3.com' } });
  
    await waitFor(() =>fireEvent.click(submitButton))
    
    const newTitle = getByText('My Third Url');
    const newLongUrl = getByText('www.thisisalongurl3.com');
    const newShortUrl = getByText('www.shorturl3.com');
    
    expect(newTitle).toBeInTheDocument();
    expect(newLongUrl).toBeInTheDocument();
    expect(newShortUrl).toBeInTheDocument();
  })

  it('should allow the user to delete a card by clicking on its associated button', async () => {
    const { getByText, getAllByText } = await render(
      <App />
    )

    const firstTitle = getByText('My First Url');
    const firstLongUrl = getByText('www.thisisalongurl1.com');
    const firstShortUrl = getByText('www.shorturl.com');

    expect(firstTitle).toBeInTheDocument();
    expect(firstLongUrl).toBeInTheDocument();
    expect(firstShortUrl).toBeInTheDocument();

    const deleteButtons = getAllByText('Delete');
    fireEvent.click(deleteButtons[0])

    expect(firstTitle).not.toBeInTheDocument();
    expect(firstLongUrl).not.toBeInTheDocument();
    expect(firstShortUrl).not.toBeInTheDocument();
  })

  it('should disable the submit button to prevent the user from submitting without having both inputs filled out', async () => {
    const { getByText, getByPlaceholderText } = await render(
      <App />
    )

    const titleInput = getByPlaceholderText('Title...');
    const urlInput = getByPlaceholderText('URL to Shorten...');
    const submitButton = getByText('Shorten Please!');

    expect(submitButton).toBeDisabled();

    fireEvent.change(titleInput, { target: { value: 'My Test Url' } });
    expect(submitButton).toBeDisabled();

    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.change(urlInput, { target: { value: 'www.enteredLongUrl.com' } });
    expect(submitButton).toBeDisabled();

    fireEvent.change(titleInput, { target: { value: 'My Test Url' } });
    expect(submitButton).not.toBeDisabled();
  })
})