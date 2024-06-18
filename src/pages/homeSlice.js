import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import headers from './allRepositoriesSlice';

import userCached from "./userCached.json";

const githubUsername = "drvictorvs";

const initialState = {
  isLoading: true,
  error: "",
  data: [],
};

export const url = `https://api.github.com/users/${githubUsername}`;

export const fetchGitHubInfo = createAsyncThunk(
  "home/fetchGitHubInfo",
  async (_, { rejectWithValue }) => {
    try {
      const cacheKey = 'githubData';
      const cached = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(`${cacheKey}_time`);

      if (cached !== null && cacheTime !== null) {
        const age = (Date.now() - cacheTime) / 1000 / 60 / 60;
        if (age < 2) {
          return JSON.parse(cached);
        }
      }
      
      const response = await fetch(url, { headers }).then(function (res) {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response;
      });
      const data = await response.json();


      // Save the fetched data to local storage
      localStorage.setItem(cacheKey, JSON.stringify(data));
      localStorage.setItem(`${cacheKey}_time`, Date.now());

      return data;
    } catch (error) {
      return rejectWithValue(
        `Error: ${error.message}`
      );
    }
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitHubInfo.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchGitHubInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchGitHubInfo.rejected, (state, _) => {
        state.isLoading = false;
        state.data = userCached;
        console.log(state.error);
      });
  },
});

export const selectIsLoading = (state) => state.home.isLoading;
export const selectError = (state) => state.home.error;
export const selectData = (state) => state.home.data;

export default homeSlice.reducer;
