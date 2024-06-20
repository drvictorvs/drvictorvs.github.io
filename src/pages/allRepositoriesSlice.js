import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cached from "./cached.json";

import { projectCardImages } from "../components/Repositories";

const githubUsername = "drvictorvs";

const initialState = {
  error: "",
  isLoading: true,
  data: [],
};

export const url = `https://api.github.com/users/${githubUsername}/repos?per_page=100`;
export const headers = new Headers({
});


export const fetchGitHubRepos = createAsyncThunk(
  'allRepositories/fetchGitHubRepos',
  async (_, { rejectWithValue }) => {
    try {
      const cacheKey = 'githubData';
      const cached = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(`${cacheKey}_time`);

      if (cached !== null && cacheTime !== null) {
        const age = (Date.now() - cacheTime) / 1000 / 60 / 60; 
        if (age < 2) { 
          return cached;
        }
      }

      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();

      // Add a new key 'lang' to each repository object in the data array
      const dataWithLang = await Promise.all(data.map(async (repo) => {
        const langResponse = await fetch(repo.languages_url, { headers });
        var langData = { "unknown": 0 }
        if (langResponse.ok) {
          langData = await langResponse.json();
        }
        return { ...repo, repo_lang: langData };
      }));

      // Save the fetched data to local storage
      localStorage.setItem(cacheKey, JSON.stringify(dataWithLang));
      localStorage.setItem(`${cacheKey}_time`, Date.now());

      return dataWithLang;
    } catch (error) {
      const cacheKey = 'githubData';
      const cached = localStorage.getItem(cacheKey);
      if (cached) { 
        return JSON.parse(cached);
      } else {
        return rejectWithValue(
          `Error: ${error.message}`
        );
    }
    }
  }
);


export const allRepositoriesSlice = createSlice({
  name: "allRepositories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitHubRepos.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchGitHubRepos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchGitHubRepos.rejected, (state, _) => {
        state.isLoading = false;
        state.data = JSON.parse(cached);
      });
    }
})

export const selectIsLoading = (state) => state.allRepositories.isLoading;
export const selectError = (state) => state.allRepositories.error;
export const selectData = (state) => state.allRepositories.data;

export default allRepositoriesSlice.reducer;
