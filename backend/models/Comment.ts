import mongoose, {Types} from 'mongoose';
import OneNews from "./OneNews";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  news: {
    type: Schema.Types.ObjectId,
    ref: 'OneNews',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => OneNews.findById(value),
      message: 'OneNews does not exist'
    }
  },
  message: {
    type: String,
    required: true
  },
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;








