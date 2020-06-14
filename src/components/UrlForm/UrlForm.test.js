import UrlForm from './UrlForm';
import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';

describe('UrlForm', () => {
  const mockAddPostToDom = jest.fn()

  it('should render the correct content', () => {
    const { getByText, getByPlaceholderText } = render(
      <UrlForm  />
    )
    
    const titleInput = getByPlaceholderText('Title...');
    const urlInput = getByPlaceholderText('URL to Shorten...');
    const submitButton = getByText('Shorten Please!');

    expect(titleInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  })

  it('should update the inputs as text is entered', () => {
    const { getByPlaceholderText } = render(
      <UrlForm />
    )

    const titleInput = getByPlaceholderText('Title...');
    const urlInput = getByPlaceholderText('URL to Shorten...');

    fireEvent.change(titleInput, { target: { value: 'My Test Url' } });
    expect(titleInput.value).toBe('My Test Url');

    fireEvent.change(urlInput, { target: { value: 'www.enteredLongUrl.com' } });
    expect(urlInput.value).toBe('www.enteredLongUrl.com');
  })

  it('should invoke the addPostToDom function when a new post is submitted', async() => {
    const { getByText, getByPlaceholderText } = render(
      <UrlForm addPostToDom={mockAddPostToDom}/>
    )

    const titleInput = getByPlaceholderText('Title...');
    const urlInput = getByPlaceholderText('URL to Shorten...');
    const submitButton = getByText('Shorten Please!');

    fireEvent.change(titleInput, { target: { value: 'My Test Url' } });
    fireEvent.change(urlInput, { target: { value: 'www.enteredLongUrl.com' } });
    fireEvent.click(submitButton);
    await waitFor(() => expect(mockAddPostToDom).toHaveBeenCalled())
  })

  it('should disable the submit button to prevent the user from submitting without having both inputs filled out', async () => {
    const { getByText, getByPlaceholderText } = await render(
      <UrlForm addPostToDom={mockAddPostToDom} />
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