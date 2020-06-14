import React, { Component } from "react";
import "./App.css";
import { getUrls, removeUrl } from "../../apiCalls";
import UrlContainer from "../UrlContainer/UrlContainer";
import UrlForm from "../UrlForm/UrlForm";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
    };
  }

  componentDidMount() {
    getUrls()
      .then((data) => this.setState({ urls: data.urls }));
  }

  addPostToDom = (newPost) => {
    this.setState({urls: [...this.state.urls, newPost]})
  }

  deletePost = (urlID) => {
    removeUrl(urlID)
    this.removeFromDom(urlID)
  }

  removeFromDom = (urlID) => {
    this.setState({ urls: this.state.urls.filter(url => url.id !== urlID)})
  }

  render() {
    return (
      <main className='App'>
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addPostToDom={this.addPostToDom}/>
        </header>

        <UrlContainer urls={this.state.urls} deletePost={this.deletePost}/>
      </main>
    );
  }
}

export default App;
