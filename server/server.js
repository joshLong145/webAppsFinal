const express = require('express');
const bodyParser = require('body-parser');
const mongo = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongo.connect("mongodb://localhost/db") // dabase being used called db
const db = mongo.connection;

db.on('error', console.error.bind(console, "Connection error!"));

db.once('open', function() {
  const date = new Date();
  console.log("Database connect at: ", date.getHours(), ":", date.getMinutes());
});

var contactSchema = new mongo.Schema({
  firstName: String,
  lastName: String,
  street: String,
  state: String,
  zip: String,
  coords: Array
});

let contactModel = mongo.model('contactModel', contactSchema);

app.get('/api/get/contacts', async (req, res) => {

  const data = await contactModel.find((err, arr) =>{
      if(err)
        return console.error(err);
  });

  res.send(
    {contacts: data}
  );

});


app.post('/api/addUser', async (req, res) => {
  let newContact = new contactModel(req.body.post);
  
  const update = await newContact.save((err, newContact) =>{
      if(err) return console.error(err);

      console.log("data saved", req.body.post);
  }); 

  res.send(
    { contacts: "data saved"}
  );
});


app.put('/api/updateUser', async (req, res) => {
    console.log(req.body.post._id);
    const document = req.body.post;
    let update = await contactModel.findOneAndUpdate({_id: document._id}, 
                                                      document, 
                                                      {upsert: true}, 
                                                      (err, doc) =>{
      if(err) return console.error(err);

      console.log("contact updated");
    });


    res.send({data: update});
});


app.delete('/api/deleteUser', async (req, res) => {
  const document = req.body.post;

    let deleteReq = await contactModel.findOneAndDelete({_id: document._id},
                                                        (err,doc) =>{
                    if(err) return console.error(err);
                    console.log("contact deleted.", doc);
    });

});

app.listen(port, () => console.log(`Listening on port ${port}`));