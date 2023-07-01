import { Router } from 'express';
import Entry from '../models/Entry.mjs';
const router = Router();

router.post('/', async (req, res) => {
    const { content, date, metadata} = req.body;

    try {
        const entry = new Entry({
            content,
            date,
            metadata
        });

        await entry.save();

        res.json({ entry });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Server error' })
    }
});

router.get('/', async (req,res) => {
    try {

        const entries = await Entry.find();

        res.json({ entries});
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;