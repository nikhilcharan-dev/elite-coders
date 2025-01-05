// routes/topicRoutes.js
import express from 'express';
import Topic from '../models/topic.js';
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const topics = await Topic.find();
		res.status(200).json(topics);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching topics', error });
	}
});

router.post('/add', async (req, res) => {
	const { name, gfgLink, youtubeLink } = req.body;

	try {
		const newTopic = new Topic({
			name,
			gfgLink,
			youtubeLink
		});

		await newTopic.save();
		res.status(201).json({ message: 'Topic created successfully!', newTopic });
	} catch (error) {
		res.status(500).json({ message: 'Error creating topic', error });
	}
});


router.get('/:id', async (req, res) => {
	const { id } = req.params;

	console.log(id);

	try {
		const topic = await Topic.findById(id);
		console.log(topic)
		if (!topic) {
			return res.status(404).json({ message: 'Topic not found' });
		}
		res.status(200).json(topic);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching topic', error });
	}
});

export default router;
