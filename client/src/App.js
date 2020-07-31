import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  state = {
    title: '',
    body: '',
    posts: []
  }
  handleChange = ({target}) => {
    const {name, value} = target;

    this.setState({
      [name]: value
    })
  }

  componentDidMount = () => {
    this.getBlogPosts()
  }

  getBlogPosts = () => {
    console.log('getting blog posts')
    axios.get('/api')
    .then((res) => {
      const data = res.data;
      this.setState({
        posts: data
      })
    })
  }

  displayBlogPosts = (posts) => {
    if(!posts.length) return null
    return posts.map((post, i)=>(
      <div key={i}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ))
  }
  submit = (event) => {
    event.preventDefault();
    const payload = {
      title: this.state.title,
      body: this.state.body
    }

    axios({
      // url: 'http://localhost:8080/api/save',
      url: '/api/save',
      method: 'POST',
      data: payload
    })
    .then((response)=>{
      console.log('data has been sent to the server')
      this.getBlogPosts()
      this.resetInputs();
    })
    .catch(()=>{
      console.log('Internal Server error')
    })
  }

  resetInputs = () => {
    this.setState({
      title: '',
      body: ''
    })
  }

  render(){
    console.log('State: ', this.state)
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={this.submit}>
          <div className="form-input">
            <input 
            type="text"
            placeholder="Enter title"
            name="title"
            onChange={ this.handleChange }
            value={this.state.title}
            />
          </div>
          <div className="form-input">
            <textarea value={this.state.body} placeholder="body" name="body" id="" cols="30" rows="10" onChange={this.handleChange}></textarea>
          </div>
          <button type="submit">submit</button>
        </form>
      </header>
      <div className="blog">
        {this.displayBlogPosts(this.state.posts)}
      </div>
    </div>
    );
  }
}

export default App;
