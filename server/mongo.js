const mongo = require("mongoose");

mongo.connect("mongodb://localhost/db") // dabase being used called db
const db = mongo.connection;

/**
 * Mongodb database schema. 
 * 
 */
const contactSchema = new mongo.Schema({
    firstName: String,
    lastName: String,
    street: String,
    state: String,
    zip: String,
    coords: [{type: Number}]
});

/**
 * Definition of collection for mongodb database.
 */
const contactModel = mongo.model('contactModel', contactSchema);

/**
 * Initialize connection to mongodb database
 * on error, log error to console with stack trace.
 */
module.exports.initDatabase = () => {
    db.on('error', console.error.bind(console, "Connection error!"));

    db.once('open', function() {
        const date = new Date();
        console.log("Database connect at: ", date.getHours(), ":", date.getMinutes());
    });
}

/**
 * request to query all contacts within a collection.
 */
module.exports.queryContacts = async () => {
    const data = await contactModel.find((err, arr) =>{
        if(err)
            return console.error(err);
    });

    return data;
};

/**
 * 
 * @param {*} contact 
 */
module.exports.saveContact = async (contact) =>{
    let newContact = new contactModel(contact);

    console.log("data being saved: ", newContact);

    const saveData = await newContact.save((err, newContact) =>{
        if(err) throw Error(err);
    }); 

    return saveData;
}   

/**
 * 
 * @param {*} contact 
 */
module.exports.updateContact = async (contact) =>{
    const document = contact;
    let update = await contactModel.findOneAndUpdate({_id: document._id}, 
                                                      document, 
                                                      {upsert: true}, 
                                                      (err, doc) =>{
      if(err) throw Error(err);

      console.log("contact updated", doc);
    });

    return update;
}

/**
 * 
 * @param {*} contact 
 */
module.exports.deleteContact = async (contact) =>{
    let deleteReq = await contactModel.findOneAndDelete({_id: contact._id},
        (err,doc) =>{
        if(err) throw Error(err);

        console.log("contact deleted.", doc);
    });

    return deleteReq; 
}
