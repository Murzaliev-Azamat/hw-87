import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from '../../axiosApi';
import { Comment, CommentApi } from '../../../types';
import { RootState } from '../../app/store';

export const fetchComments = createAsyncThunk<Comment[], string>(
  'comments/fetchAll',
  async (id) => {
    const commentsResponse = await axiosApi.get<Comment[]>('/comments/' + id);
    return commentsResponse.data;
  }
);

export const fetchComment = createAsyncThunk<Comment, string>(
  'comments/fetchOne',
  async (id) => {
    const commentResponse = await axiosApi.get<Comment | null>('comments/' + id);
    const comment = commentResponse.data;

    if (comment === null) {
      throw new Error('Not found!')
    }

    return comment;
  },
);


export const addComment = createAsyncThunk<void, CommentApi, { state: RootState }>(
  'comments/add',
  async (comment, {getState}) => {
    const user = getState().users.user;

    if (user) {
    await axiosApi.post<CommentApi>('/comments', comment, {headers: {'Authorization': user.token}});
    } else {
      throw new Error('No user');
    }
  }
);

export const deleteComment = createAsyncThunk<void, string>(
  'comments/deleteOne',
  async (id) => {
    await axiosApi.delete('/comments/' + id);
  }
);