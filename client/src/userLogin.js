import React, { Component } from 'react';
import './App.css'

class userLogin extends Component{

    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        }
    }

    componentDidMount(props){

    }

    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/userLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ post: this.state }),
        });
        const body = await response.json();
        // log data to client console for debug purposes.
        if(body){
            this.props.toggle();
        }
    };

    render(){
        return(
            <div>
                <p>
                    <strong> Please login to spy on people </strong>
                </p> 
                <form onSubmit={this.handleSubmit}> 
                    <p>
                        <strong> User name</strong>
                    </p>           
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.state.username = e.target.value}
                    />
                    <br/>
                    <p>
                        <strong> Password </strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.post}
                        onChange={e => this.state.password = e.target.value}
                    />
                    <br/>
                    <button type="submit"> log in</button>
                </form>
            </div>
        );
    }
}


export default userLogin;