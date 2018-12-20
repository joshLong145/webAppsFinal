import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import './App.css';

import ContactTable from "./ContactTable";
import createUser from './createUser';
import Login from './userLogin';

class App extends Component {
  
  state = {
    post: "",
    isLoggedIn: false
  }

  // If the app component mounts successfully then we are in buisness. 
  componentDidMount() { 

  }

  toggleLogIn = () =>{
    this.setState({isLoggedIn: true});
  }

  render() {
    let contacts;

    if(this.state.isLoggedIn){
      contacts = <Route path="/contacts" component={ContactTable}  />;
    }else{
      contacts = <Route path="/contacts" component={() => <Login toggle={this.toggleLogIn} />}/>
    }
    return (
      <div className="App">
        <p> <Link to="/contacts"> <strong> see contacts </strong> </Link> </p>
        <p> <Link to="/mailer"> <strong> create user </strong> </Link> </p>
        <br/>
          {contacts}
        <br/>
          <Route path="/mailer" component={createUser} />
      </div>
    );
  }
}

export default App;
