            const express = require('express');
            const bodyParser = require('body-parser');
            const cors = require('cors');
            const Binance = require('binance-api-node').default;
            require('dotenv').config();

            // setting up middleware // bodyparser for parsing json request bodies 
            //cors for enabling cross-origin-resource sharing 
            const app = express();
            app.use(bodyParser.json());
            app.use(cors());

            const client = Binance({
            apiKey: process.env.BINANCE_API_KEY,
            apiSecret: process.env.BINANCE_API_SECRET,
            });

            // creating  a new payment request
            app.post('/api/create-payment', async (req, res) => {
            const { asset, amount, address } = req.body;

            if (!asset || !amount || !address) {
                return res.status(400).send({ error: 'Missing required fields' });
            }

            try {
                res.status(200).send({
                asset,
                amount,
                address, 
                });
            } catch (error) {
                console.error('Error creating payment:', error);
                res.status(500).send({
                error: 'Failed to create payment',
                details: error.message,
                });
            }
            });

            //checking the payment status
            app.post('/api/check-payment', async (req, res) => {
            const { asset, address } = req.body;

            if (!asset || !address) {
                return res.status(400).send({ error: 'Missing required fields' });
            }

            try {
                const accountInfo = await client.accountInfo();
                const payment = accountInfo.balances.find(balance => balance.asset === asset && balance.free > 0);

                res.status(200).send({
                received: !!payment,
                balance: payment ? payment.free : '0',
                });
            } catch (error) {
                console.error('Error checking payment:', error);
                res.status(500).send({
                error: 'Failed to check payment',
                details: error.message,
                });
            }
            });

            //sending payment to a client
            app.post('/api/send-payment', async (req, res) => {
            const { asset, amount, address } = req.body;

            if (!asset || !amount || !address) {
                return res.status(400).send({ error: 'Missing required fields' });
            }

            try {
                const result = await client.withdraw({
                asset,
                amount,
                address,
                });

                res.status(200).send(result);
            } catch (error) {
                console.error('Error sending payment:', error);
                res.status(500).send({
                error: 'Failed to send payment',
                details: error.message,
                });
            }
            });

            //withdrawing  funds
            app.post('/api/withdraw', async (req, res) => {
            const { asset, amount, address } = req.body;

            if (!asset || !amount || !address) {
                return res.status(400).send({ error: 'Missing required fields' });
            }

            try {
                const result = await client.withdraw({
                asset,
                amount,
                address,
                });

                res.status(200).send(result);
            } catch (error) {
                console.error('Error withdrawing funds:', error);
                res.status(500).send({
                error: 'Failed to withdraw funds',
                details: error.message,
                });
            }
            });

            // Webhook to receive payment notifications
            app.post('/api/webhook', (req, res) => {
            const payload = req.body;

            console.log('Received webhook:', payload);
                    //store payment info to my firestore db
            res.status(200).send({ received: true });
            });

            app.listen(3000, () => {
                console.log('server running on http://localhost:3000');
            });