export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrl = (long_url, title) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      long_url, title
    })
  })
    .then(response => response.json())
  .catch(err => console.error(err))
}

export const removeUrl = (urlID) => {
  return fetch(`http://localhost:3001/api/v1/urls/${urlID}`, {
    method: 'DELETE'
  })
  .catch(err => console.error(err))
}