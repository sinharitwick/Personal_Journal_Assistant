const express = require('express');
const router = express.Router();
const Prompt = require('./models/Prompt');

router.post('/', async (req, res) => {
    const { prompt } = req.body;

    try {
        const newPrompt = new Prompt({
            prompt
        });

        await newPrompt.save();

        res.json({ prompt: newPrompt });
    } catch (error) {
        console.error('Error', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const prompts = await Prompt.find();

        res.json({ prompts });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;