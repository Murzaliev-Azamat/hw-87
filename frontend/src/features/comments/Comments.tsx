import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchComments } from './commentsThunks';
import { selectComments } from './commentsSlice';
import CardForComment from '../../components/UI/CardForComment/CardForComment';
import { useParams } from 'react-router-dom';

const Comments = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);

  console.log(id)

  useEffect(() => {
    if (id) {
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <CardForComment key={comment._id} author={comment.author.username} message={comment.message} id={comment._id}/>
        ))}
    </div>
  );
};

export default Comments;