import React, { Component } from 'react';
import './App.css'


class createUser extends Component{

    state = {
      firstName: "",
      lastName: "",
      street: "",
      state: "",
      zip: "",
      phone: "",
      email: "",
      prefix: "",
      coords: []  
    }

    componentDidMount(){

    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/addUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post: this.state }),
        });
        const body = await response.json();
        // log data to client console for debug purposes.
        console.log(this.state.responseToPost)
        this.setState({ responseToPost: body["contacts"] });
      };
    

    render(){
        return(
            <div className="App">
                <p>
                    <strong>Enter Contact Information:</strong>
                </p> 
                <form onSubmit={this.handleSubmit}> 
                    <p>
                        <strong> First Name</strong>
                    </p>           
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.state.firstName = e.target.value}
                    />
                    <br/>
                    <p>
                        <strong> Last Name</strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.state.lastName = e.target.value}
                    />
                    <br/>
                    <p>
                        <strong> Street Name</strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.state.street = e.target.value}
                    />
                    <br/>
                    <p>
                        <strong> State</strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.state.state = e.target.value}
                    />
                    <br/>
                    <p>
                        <strong> Zip code </strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.state.zip = e.target.value}
                    />
                    <br/>
                    <p>
                        <strong> Phone number </strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.state.phone = e.target.value}
                    />
                    <br/>
                    <p>
                        <strong> Email </strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.state.email = e.target.value}
                    />
                    <br/>
                    <p>
                        <strong> Prefix </strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.state.prefix = e.target.value}
                    />
                    <br/>
                    <button type="submit">Submit</button>
            </form>
          </div>
        );
    }

}

export default createUser;