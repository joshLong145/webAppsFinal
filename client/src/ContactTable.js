import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
import UpdateContact from './UpdateContact';

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoiamxvbmcyIiwiYSI6ImNqb2RiM3lsdTB1bTYzdm1zZTJ2cXNrcGgifQ.jNhf4j5RCepYVW4MCQUnlg"
});

class ContactTable extends Component{

    constructor(props) {
        super(props);    
        
        // This binding is necessary to make `this` work in the callback
        this.updateContact = this.updateContact.bind(this);
        this.deleteContacts = this.deleteContacts.bind(this);

        this.state = {
            data: [],
            editUser: false,
            cachedUser: null
        }
      }

    // If the app component mounts successfully then we are in buisness. 
    componentDidMount() { 
        this.callApi()
            .then(res => this.setState({ data: res }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/get/contacts');
        const body = await response.json();
        
        if (response.status !== 200) throw Error(body.message);

        return body.contacts;
    };

    updateContact = (contact) => (event) => {
        this.setState({
            data: this.state.data,
            editUser: !this.state.editUser,
            cachedUser: contact
        });
    }
    

    updateContacts = (contact) =>{
        let tmpData = this.state.data;
        console.log(contact);
        for(let i = 0; i < tmpData.length; i++){
            if(tmpData[i]._id === contact._id){
                tmpData[i] = contact;
                this.setState({data : tmpData });
                break; //   Only need to update  one item, so break out of loop once it is found.
            }
        }
    }

    deleteContacts = (contact) => (event) => {
        let deleteReq = fetch('/api/deleteUser',{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ post: contact}),
        });
        
        let tmpData = this.state.data;
        for(let i = 0; i < tmpData.length; i++){
            if(tmpData[i]._id === contact._id){
                tmpData.splice(i,1);
                this.setState({data : tmpData });
                break; //   Only need to update  one item, so break out of loop once it is found.
            }
        }
    }

    createTable = () => {
        let table = [];
    
        // Outer loop to create parent
        for (let i = 0; i < this.state.data.length; i++) {
            let children = [];
            //Inner loop to create children ( will be needed again soon.)
            children.push(<td>{this.state.data[i].firstName}</td>);
            children.push(<td>{this.state.data[i].lastName}</td>);
            children.push(<td>{this.state.data[i].street}</td>);
            children.push(<td>{this.state.data[i].state}</td>);
            children.push(<td>{this.state.data[i].zip}</td>);
            children.push(<td> <button 
                                    onClick={this.updateContact(this.state.data[i])}> 
                                    Update info 
                                </button> 
                          </td>);
            children.push(<td> <button 
                                    onClick={this.deleteContacts(this.state.data[i])}> 
                                    Delete contact 
                                </button> 
                          </td>);
                          
            //Create the parent and add the children
            table.push(<tr>{children}</tr>);
        }
        return table
    }
    
    render() {
        const editUser = this.state.editUser;
        let editPage;

        if(editUser){
            editPage =  <UpdateContact 
                            contactData={this.state.cachedUser}
                            updateContacts={this.updateContacts}
                             />   
        } else{
            editPage = <br/>
        }


        return(
            <div className="contacts">
                <p> Contact table </p>
                <table className="contact-table">
                    <thead>
                        <tr>
                            <th> First Name </th>
                            <th> Last Name </th>
                            <th> Street </th>
                            <th> State </th>
                            <th> Zip </th>
                            <th>  </th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createTable()}
                    </tbody>
                </table>
                <br/>
                <Map className="mapObj"
                    style="mapbox://styles/mapbox/streets-v9"
                    containerStyle={{
                        height: "50vh",
                        width: "50vw",
                    }}>
                    <Layer
                        type="symbol"
                        id="marker"
                        layout={{ "icon-image": "marker-15" }}>
                        <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
                    </Layer>
                    <Marker
                        coordinates={[-0.481747846041145, 51.323337965023]}
                        anchor="bottom">
                        <h1> test </h1>
                    </Marker>

                </Map>

                {editPage}
            </div>
        );
    }
}

export default ContactTable;