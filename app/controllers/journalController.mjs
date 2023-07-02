import { pipeline } from '@xenova/transformers';
let classifier = await pipeline('sentiment-analysis');
import { Router } from 'express';
import User from '../models/User.mjs';
import Entry from '../models/Entry.mjs';
import validateToken from '../middleware/validateToken.mjs';
const router = Router();

router.post('/', validateToken, async (req, res) => {
    const { content, date, metadata, goals } = req.body;
    try {
        const userId = req.user.id;
        // const user = res.locals.user;
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({message: 'User not found!'});
        }

        let sentiment = await classifier(content);
        
        const entry = new Entry({
            content,
            date,
            metadata,
            goals,
            sentiment,
            user: userId
        });

        await entry.save();

        user.entries.push(entry._id);
        await user.save();

        res.json({ entry });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Server error' })
    }
});

router.get('/', validateToken, async (req,res) => {
    const userId = req.user.id;
    try {
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({ message: 'User not found!'});
        }

        const entries = await Entry.find({ user: userId });

        res.json({ entries});
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id', validateToken, async(req, res) => {
    const { content, metadata, goals } = req.body;
    const { id } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    try {
        if(!user) {
            return res.status(404).json({ message: 'User not found!'});
        }
        const entry = await Entry.findById(id);

        if(!entry) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        if(entry.user.toString()!==userId) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        entry.content = content;
        entry.metadata = metadata;
        entry.goals = goals;

        await entry.save();

        res.json({ entry });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Server error'});
    }
});

router.delete('/:id', validateToken, async(req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const user = await User.findById(userId);
    try {
        if(!user) {
            return res.status(404).json({ message: 'User not found!'});
        }

        const entry = await Entry.findById(id);

        if(!entry) {
            return res.status(404).json({ message: 'Entry not found'});
        }

        if(entry.user.toString()!==userId) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        await entry.deleteOne();

        user.entries = user.entries.filter((entryId) => entryId.toString() !== id);
        await user.save();

        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Server error'});
    }
});

export default router;