import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '../../mocks/data';

interface FeedState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  filter: {
    type?: string;
    guild?: string;
    tag?: string;
  };
}

const initialState: FeedState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  filter: {},
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action: PayloadAction<Post[]>) => {
      state.posts = [...state.posts, ...action.payload];
      state.loading = false;
      state.hasMore = action.payload.length > 0;
    },
    fetchPostsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<typeof initialState.filter>) => {
      state.filter = action.payload;
      state.posts = [];
      state.hasMore = true;
    },
    clearFeed: (state) => {
      state.posts = [];
      state.hasMore = true;
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  addPost,
  updatePost,
  deletePost,
  setFilter,
  clearFeed,
} = feedSlice.actions;

export default feedSlice.reducer;