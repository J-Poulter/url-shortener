import React, { Component } from 'react';
import { postUrl } from '../../apiCalls';

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit =  (e) => {
    const { urlToShorten, title } = this.state
    e.preventDefault();
    postUrl(urlToShorten, title)
      .then(data => this.props.addPostToDom(data))
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
          required
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
          required
        />

        <button type='submit'>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
