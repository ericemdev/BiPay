        const express = require( 'express');
        const bodyParser = require('body-parser');
        const cors = require('cors');


        const binance = require('binance-api-node').default;
        require('dotenv').config();

        const app = express ();
        app.use(bodyParser.json());
        app.use(cors());

        const client = Binance ({
            apiKey: process.env.Binance_API_KEY,
            apiSecret: process.env.Binance_API_SECRET,
        });

        app.post('/webhook', (req, res) => {
            const event = req.body;

            console.log ('Received webhook event:', event);

            global.latestEvent = event;

            res.status(200).send('webhook received')
        });

        app.get('/api/latestEvent', (req, res) =>{
            res.json(global.latestEvent || {});
        });

        app.listen(3000, () => {
            console.log('server running on http://localhost:3000');
        });

    