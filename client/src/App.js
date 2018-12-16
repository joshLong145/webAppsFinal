import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import './App.css';

import ContactTable from "./ContactTable";
import createUser from './createUser';

class App extends Component {
  
  state = {
    post: ""
  }

  // If the app component mounts successfully then we are in buisness. 
  componentDidMount() { 

  }

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.json();
    // log data to client console for debug purposes.
    console.log(this.state.responseToPost)
    this.setState({ responseToPost: body["contacts"] });
  };

  render() {
    return (
      <div className="App">
        <p> <Link to="/contacts"> <strong> see contacts </strong> </Link> </p>
        <p> <Link to="/mailer"> <strong> create user </strong> </Link> </p>
        <br/>
        <Route path="/contacts" component={ContactTable} />
        <br/>
        <Route path="/mailer" component={createUser} />
      </div>
    );
  }
}

export default App;
