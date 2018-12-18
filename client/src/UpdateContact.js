import React, { Component } from 'react';
import './App.css'

class UpdateContact extends Component{

    constructor(props){
        super(props);
        this.state = {
            contact: props.contactData,
            hasSubmitted: false
        }

        console.log(this.state.contact);
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
          body: JSON.stringify({ post: this.state.contact }),
        });

        const body = await response.json();
        // log data to client console for debug purposes.
        this.setState(body);
        this.props.updateContacts(this.state.contact);
        this.setState({hasSubmitted: true});
    }
    

    render(){
        let status;
        if(!this.state.hasSubmitted){
            status = <strong> Update contact information </strong>
        }else{
            status = <strong> Contact information updated </strong>
        }

        return(
            <div className="Update">
                <p>
                    {status}
                </p> 
                <form onSubmit={this.handleSubmit}> 
                    <p>
                        <strong> First Name</strong>
                    </p>           
                    <input
                        type="text"
                        value={this.state.contact.firstName}
                        onChange={(e) =>{
                                            let tmpContact = this.state.contact;
                                            tmpContact.firstName = e.target.value;  
                                            this.setState({contact: tmpContact});
                                        }   
                                }
                    />
                    <br/>
                    <p>
                        <strong> Last Name</strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.contact.lastName}
                        onChange={(e) =>{
                                            let tmpContact = this.state.contact;
                                            tmpContact.lastName = e.target.value;  
                                            this.setState({contact: tmpContact});
                                        }   
                        }
                    />
                    <br/>
                    <p>
                        <strong> Street Name</strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.contact.street}
                        onChange={(e) =>{
                                            let tmpContact = this.state.contact;
                                            tmpContact.street = e.target.value;  
                                            this.setState({contact: tmpContact});
                                        }   
                        }
                    />
                    <br/>
                    <p>
                        <strong> State</strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.contact.state}
                        onChange={(e) =>{
                                            let tmpContact = this.state.contact;
                                            tmpContact.state = e.target.value;  
                                            this.setState({contact: tmpContact});
                                        }   
                        }
                    />
                    <br/>
                    <p>
                        <strong> Zip code </strong>
                    </p> 
                    <input
                        type="text"
                        value={this.state.contact.zip}
                        onChange={(e) =>{
                                            let tmpContact = this.state.contact;
                                            tmpContact.zip = e.target.value;  
                                            this.setState({contact: tmpContact});
                                        }   
                        }
                    />
                    <br/>
                    <button type="submit">Submit</button>
                    <br/>
                    <br/>
                    <button onClick={this.props.removeComponent}> done </button>
            </form>
          </div>
        );
    }

}

export default UpdateContact;