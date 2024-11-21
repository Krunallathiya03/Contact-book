const express = require('express');
const { addContactController, 
        getallContactController, 
        updateContactController,
        deleteContactController,
        getContactByNameController,
        exportContactController,
        } = require('../controllers/contactController');


const router = express.Router();

//Add new contact
router.post('/add',addContactController)

//Get all Contacts
router.get('/',getallContactController)

//get contacts by name
router.get('/getcontact',getContactByNameController)


//update contact
router.put('/update/:id',updateContactController)

//delete contact
router.delete('/delete/:id',deleteContactController)

//export contact
router.get('/export',exportContactController)




module.exports = router