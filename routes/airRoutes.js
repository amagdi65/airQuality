const express = require('express');
const router = express.Router();
const { getAirQuality } = require('../helper');
const { db } = require('../dbConnection');
router.get('/airquality/:lat/:long',async (req,res)=> {
    const {lat,long} = req.params;
    try {
        const {data} = await getAirQuality(lat,long);
        const {data: {current: {pollution}}} = data;
        console.log(data);
        res.json({
            "Result": {
                pollution
            }
        }).status(200)
    } catch (error) {
        res.json(error)
    }
 
})

router.get('/mostpolluted',async (req,res) => {

    try {
        const {date,current:{pollution}} = await db.collection('most_polluted').findOne();
        res.json({
            "Result": {
                pollution,
                date
            }
        }).status(200)
    } catch (error) {
        res.json(error)
    }
  
})

module.exports = router;