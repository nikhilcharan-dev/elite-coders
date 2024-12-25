import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gfgLink: { type: String, required: true },
  youtubeLink: { type: String, required: true }
}, { timestamps: true });

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;
