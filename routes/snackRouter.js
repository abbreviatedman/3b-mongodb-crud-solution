/*
    6a. Set up basic router settings
*/
const express = require('express');

const Snack = require('../models/snackModel');

const router = express.Router();

// Create - POST
// Read - GET
// Update - PUT
// Delete - DELETE
/*
    9. Write a router method to GET from the database
*/
// localhost:8080/api/snacks
router.get('/snacks', async function (req, res) {
    try {
        const foundSnacks = await Snack.find({})
        // add check here for foundSnacks.length === 0
        // if it is 0, send a 404 error
        res.json({
            message: 'success',
            payload: foundSnacks,
        })
    } catch (error) {
        const errorPacket = {
            message: 'failure',
            payload: error,
        }
        
        // send the packet to the client:
        res.status(500).json(errorPacket);
        // print the packet to the console
        console.log(errorPacket);
    }
})
/*
    8. Write a router method to post to the database
*/
// localhost:8080/api/snacks
router.post("/snacks", async function (req, res) {
    try {
        const newSnack = await Snack.create(req.body);
        res.json({
            message: 'success',
            payload: newSnack,
        })
    } catch (error) {
        const errorPacket = {
            message: 'failure',
            payload: error
        }
        
        console.log(errorPacket);
        res.status(500).json(errorPacket);
    }
})
/*
    10. Write a router method to PUT into the database
*/
// req.body: {calories: 100} or {brand: 'Skittles'} or whatever!
router.put('/snacks/:brand', async function (req, res) {
    try {
        const updatedSnack = await Snack.findOneAndUpdate(
            { brand: req.params.brand},
            { $set: req.body},
            { upsert: true, new: true} // update or insert
        )
        
        res.status(200).json({
            message: 'success',
            payload: updatedSnack,
        })
    } catch (error) {
        const errorPacket = {
            message: 'failure',
            payload: error,
        };

        console.log(errorPacket);
        res.status(500).json(errorPacket);
    }
})
/*
    11. Write a router method to DELETE from the database
*/
router.delete('/snacks/:id', async function (req, res) {
    try {
        const deletedSnack = await Snack.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'success',
            payload: deletedSnack,
        })
    } catch (error) {
        const errorPacket = {
            message: 'failure',
            payload: error,
        }
        
        res.status(500).json(errorPacket);
        console.log(errorPacket);
    }
})
/*
    6b. Export the router
*/
module.exports = router;