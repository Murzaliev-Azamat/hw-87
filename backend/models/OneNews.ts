import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OneNewsSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  date: {
    type: Date,
    required: true
  },
});

const OneNews = mongoose.model('OneNews', OneNewsSchema);
export default OneNews;








