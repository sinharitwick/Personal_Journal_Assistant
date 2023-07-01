import { Router } from 'express';
import Prompt from '../models/Prompt.mjs';
import { generatePrompt } from '../models/gptmodel.mjs';
const router = Router();

router.post('/', async (req, res) => {
    const { prompt } = req.body;

    try {
        const newPrompt = new Prompt({
            prompt
        });

        // await newPrompt.save();

        const generatedText = await generatePrompt(prompt);

        res.json({ prompt: newPrompt, generatedText });
    } catch (error) {
        console.error('Error', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const prompts = await Prompt.find();
        // const generatedPrompt = await generatePrompt();
        
        res.json({ prompts });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;