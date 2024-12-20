import express from 'express';
import axios from 'axios';

const router = express.Router();

router
    .get('/quote', async (req, res) => {

        try {
            let response = null;
            if(Math.random() > 0.5) {
                response = await axios.get('https://v2.jokeapi.dev/joke/Programming?type=horizontal');
                return res.json({ quote: response.data.joke });
            } else {
                response = await axios.get('https://zenquotes.io/api/random');
                response = response.data[0];
                return res.json({ quote: response.q });
            }
        } catch(err) {
            res.status(500).json({ message: 'Server Error' });
        }

    });

export default router;