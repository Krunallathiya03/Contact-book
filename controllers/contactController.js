const contactModel = require('../models/contactModel');
const PDFDocument = require('pdfkit');



//Add new conatact Number
const addContactController = async (req,res) =>{
    try{
        const{name,phone,email} = req.body
        //validation 
        if(!name || !phone || !email)
            return res.status(404).json({message:"Please provide all fields"})

        //add new contact
        const CreateContact = new contactModel(req.body)
        await CreateContact.save();
        res.status(200).json({message:"Contact Added",CreateContact})

    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error in add contact controller",error})
    }
}

//Get all contact
const getallContactController = async (req,res) =>{
    try{
        const Contacts = await contactModel.find()
        if(!Contacts)
            return res.status(400).json({message:"Concats not found"})

        res.status(200).json({concats:Contacts.length,Contacts})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"error in get all contact controller api..",error})
    }
}

//searvh contact by name
const getContactByNameController = async (req,res) =>{
    try{
        const {name} = req.query
        if(!name || typeof name !== 'string' || name.trim().length === 0)
            return res.status(404).json({message:"Invalid Name , please provide valid name...."})

        const contact = await contactModel.find({name:new RegExp(name,'i')})

        if(contact.length === 0){
            return res.status(404).json({ message: "No contacts found with the provided name." });
        }
        res.status(200).json(contact)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error in search by name controller api...",error})
    }
}



//update Contact 
const updateContactController = async (req,res)=>{
    try{
       const Id  = req.params.id
       //validation
       if(!Id)
        return res.status(404).json({message})

       const contact = await contactModel.findById(Id)
       if(!contact)
        return res.status(404).json({message:"Contact not found"})

       const update = await contactModel.findByIdAndUpdate(Id, req.body, {new:true})
       res.status(200).json({message:"Updated contact",update})

    }       
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error in update concats Api...",error})

    }
}

//delete contact
const deleteContactController = async (req,res)=>{
    try{
        const Id  = req.params.id
        //validation
        if(!Id)
         return res.status(404).json({message})
 
        const contact = await contactModel.findById(Id)
        if(!contact)
         return res.status(404).json({message:"Contact not found"})

        const deleteContact = await contactModel.findByIdAndDelete(Id)
        res.status(200).json({message:"Delete contact sucessfully",deleteContact})
        
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error in delete contacts api...",error})
    }
}

//export contact as pdf
const exportContactController = async(req,res)=>{
    try{
        //fatching data from database
        const contact = await contactModel.find();

        //setting up pdf document
        const doc = new PDFDocument();

        //set HTTP response Headers
        res.setHeader('Content-Type','application/pdf')
        res.setHeader('Content-Desposition','attachment; filename="contacts.pdf"');

        doc.pipe(res);

        //add title to the pdf
        doc.fontSize(20).text('Contact List',{align:'center'})

        //add Contacts to the pdf
        contact.forEach((contact,index) => {
            doc
            .fontSize(14)
            .text(`${index + 1}. Name: ${contact.name}, Phone: ${contact.phone}, Email: ${contact.email}`);
        }); 
        doc.end();
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error in export contact Controller api...",error})
    }
}







module.exports = {addContactController,
                  getallContactController,
                  getContactByNameController,
                  updateContactController,
                  deleteContactController,
                  exportContactController
}