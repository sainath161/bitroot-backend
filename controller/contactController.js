import Contact from '../models/Contact.js'
import csvwriter from 'csv-writer'

var createCsvWriter = csvwriter.createObjectCsvWriter

// Passing the column names into the module
export const addContact = async  (req,res) =>{
    try {
        const newcontact = new Contact({
           name : req.body.name,
           contactno : req.body.contactno,
           photo : req.file.photo,
        })
  
        const data =  await newcontact.save()
       
        res.status(201).json({'msg' : 'Contact added successfully', data})
     } catch (error) {
        console.log(error)
     }
}

export const getContact = async  (req,res) =>{
    try {
        const contacts = await Contact.find().sort({_id:  -1})
      const csvWriter = createCsvWriter({path: 'data.csv',
      header: [
         {id: 'id', title: 'ID'},
         {id: 'name', title: 'NAME'},
         {id: 'contactno', title: 'PHONE NO'},
      ]
      });

         csvWriter.writeRecords(contacts)
         .then(()=> console.log('Data uploaded into csv successfully'));

        res.status(200).json(contacts)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const updateContact = async (req,res) =>{
     try {
        const updateContact = await Contact.findByIdAndUpdate(req.params.id , {$set:  req.body}, {new: true});

        res.status(200).json(updateContact)
     } catch (error) {
        res.status(400).json(error.message)
     } 
}

export const deleteContact = async (req,res) =>{
    try {
        const contacts = await Contact.findByIdAndDelete(req.params.id);

        res.status(200).json(contacts)
     } catch (error) {
        res.status(400).json(error.message)
     } 
}

export const searchContact = async (req,res) =>{
      try {
         const  data = await Contact.find(
            {
               "$or" : [
                  {"name" : {$regex:req.params.key}},
                  {"contactno" : {$regex:req.params.key}},
               ]
            }
         )  
         res.status(200).json(data) 
      } catch (error) {
        console.log(error)
      }
}