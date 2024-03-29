import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  uploads: []
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },

    setSuggestedFriends: (state, action ) => {
      if(state.user) {
        state.suggestedFriends = action.payload.suggestedFriends;
      } else 
      {
        console.error("user friends non-existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setUploads: (state, action) => {
      state.uploads = action.payload.uploads;
    },
    setUpload: (state, action ) => {
      const updatedUploads = state.uploads.map((upload)=> {
        if(upload._id === action.payload.upload._id) return action.payload.upload;
        return upload;
      });
      state.uploads = updatedUploads;
    }
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setUpload, setUploads,setSuggestedFriends } =
  authSlice.actions;
export default authSlice.reducer;
