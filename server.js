const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const Person = require('../Day_02/modules/person')
// const  router = require('../Day_02/routes/personRoutes');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/Day_o2_Data', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    mobile: Number,
    address: String,
  });
  
//   const Person = mongoose.model('Person', personSchema);
  
  app.use(express.json());



// app.put('/:id', async (req, res) => {
//     try {
//         const personId = req.params.id; // Extract the person's ID from the URL parameter
//         const updatedPersonData = req.body; // Updated data for theperson
//         // Assuming you have a Person model
//         const updatedPerson = await
//         Person.findByIdAndUpdate(personId, updatedPersonData, {
//         new: true, // Return the updated document
//         runValidators: true, });
//         if (!updatedPerson) {
//         return res.status(404).json({ error: 'Person not found'
//         });
//         }
//         // Send the updated person data as a JSON response
//         res.json(updatedPerson);
//         } catch (error) {
//         console.error('Error updating person:', error);
//         res.status(500).json({ error: 'Internal server error' });
//         }
//         });
        

// app.delete('/:id', async (req, res) => {
//     try {
//         await Person.findByIdAndDelete(req.params.id);
//         res.status(204).end();
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

//-------------------------------------------------------------------------------
const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes)
app.use(bodyParser.json());
// app.use('/persons', router);

app.listen(port, () => console.log(`Server is running on ${port}`));
