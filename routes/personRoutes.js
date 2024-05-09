const express = require('express');
const router = express.Router();
const Person = require('../modules/person');

router.post('/', async (req, res) => {
    try {
        const newPerson = new Person(req.body);
        const response = await newPerson.save();
        console.log('Data Saved');
        res.status(201).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (_req, res) => {
    try {
        const persons = await Person.find();
        console.log('Data Fetch ');
        res.status(200).json(persons);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:gender', async (req, res) => {
    try {
        const genderType = req.params.gender;
        if (genderType == 'male' || genderType == 'female' || genderType == 'na') {
            const response = await Person.find({ gender: genderType });
            console.log("Gender Fetch");
        res.json(response);
        } else {
            res.status(404).json({ error: 'Internal work type' });
        }
        
    } catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const updatedPerson = await Person.findByIdAndUpdate(personId, updatedPersonData, {
        new: true,
        runValidators: true, 
    });
        if (!updatedPerson) {
        return res.status(404).json({ error: 'Person not found'});
        }
        console.log("data Updated");
        res.json(updatedPerson);
    } catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
    });


    router.delete('/:id', async (req, res) => {
            try {
            const personId = req.params.id;
            const response = await Person.findByIdAndDelete(personId);
            if (!response) {
                return res.status(404).json({ error: 'Person not found'});
                }
                
                console.log("Data Deleted");
                res.status(200).json({ message: 'Person Deleted'});

            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

module.exports = router;
