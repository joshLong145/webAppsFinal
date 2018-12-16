import React, { Component } from 'react';
import './App.css'

class UpdateContact extends Component{

    constructor(props){
        super(props);
        this.state = props.contactData;
    }

    componentDidMount(props){
    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/updateUser', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post: this.state }),
        });
        const body = await response.json();
        // log data to client console for debug purposes.
        this.setState(body);
        this.props.updateContacts(this.state);
      };
    

    render(){
        return(
            <div className="Update">
                <p>
                    <strong>Enter Contact Information:</strong>
                </p> 
                <form onSubmit={this.handleSubmit}> 
                    <p>
                        <strong> First Name</strong>
                    </p>           
                    <input
                        type="text"
                        placeholder={this.state.firstName}
                        value={this.state.firstName}
                        onChange={e => this.setState({firstName: e.target.value})}
                    />
                    <br/>
                    <p>
                        <strong> Last Name</strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.lastName}
                        onChange={e => this.setState({lastName: e.target.value})}
                    />
                    <br/>
                    <p>
                        <strong> Street Name</strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.street}
                        onChange={e => this.setState({street: e.target.value})}
                    />
                    <br/>
                    <p>
                        <strong> State</strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.state}
                        onChange={e => this.setState({state: e.target.value})}
                    />
                    <br/>
                    <p>
                        <strong> Zip code </strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.zip}
                        onChange={e => this.setState({zip: e.target.value})}
                    />
                    <br/>
                    <button type="submit">Submit</button>
            </form>
          </div>
        );
    }

}

export default UpdateContact;