const express = require('express');
const NodeGeocoder = require('node-geocoder');
const bodyParser = require('body-parser');
const mongo = require('./mongo.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
  provider: 'mapquest',
  apiKey: 'b24rIbWnkcAzimjXKGtsYBEy2b0c1z6y',
  httpAdapter: 'https'
}
const geocoder = NodeGeocoder(options);

mongo.initDatabase();

app.get('/api/get/contacts', async (req, res) => {

  const data = await mongo.queryContacts();

  console.log(data);

  res.send(
    {contacts: data}
  );

});


app.post('/api/addUser', async (req, res) => {
  let status = "";
  const newContact = req.body.post;

  const address = newContact.street + ' ' + newContact.state + ' ' + newContact.zip; 

  const coordinates = await geocoder.geocode(address)
  .then(function(res) {
    console.log(res);
    newContact.coords.push(res[0].longitude);
    newContact.coords.push(res[0].latitude);
    console.log(newContact)
  })
  .catch(function(err) {
    console.log(err);
  });

  try{
    const saveData = await mongo.saveContact(newContact);
    status = saveData;
  }catch(err){
    status = "Error while saving."
    console.error(err);
  }

  res.send(
    { contacts: status}
  );
});


app.put('/api/updateUser', async (req, res) => {
    let status = null;
    try{
      const contact = req.body.post;
      const updateData = mongo.updateContact(contact);
      status = updateData;
    }catch(err){
      status = err;
    }

    res.send({data: status});
});


app.delete('/api/deleteUser', async (req, res) => {
  const contact = req.body.post;
  let response = null;
  try{
    const deletdContact = await mongo.deleteContact(contact);
    response = deletdContact;
  } catch(err){
    console.error(err);
    response = err;
  }

  res.send({data: response});
});


app.post('/api/userLogin', (req, res) =>{
      const creds = req.body;
      var login = false;

      if(creds.post.username === "cmps369" && creds.post.password === "finalproject"){
          login = true;
      }

      res.send({data: login});
});

app.listen(port, () => console.log(`Listening on port ${port}`));