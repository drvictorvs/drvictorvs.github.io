import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import headers from '../GITTOKEN.jsx';
import cached from "./cached.json";
// Data
// import { githubUsername, projectCardImages } from "../data";

import { projectCardImages } from "../components/Repositories";

const githubUsername = "drvictorvs";

const initialState = {
  error: "",
  isLoading: true,
  data: [],
};

export const url = `https://api.github.com/users/${githubUsername}/repos?per_page=100`;


export const fetchGitHubRepos = createAsyncThunk(
  'allRepositories/fetchGitHubReops',
  async (_, { rejectWithValue }) => {
    try {
      const cacheKey = 'githubData';
      const cached = localStorage.getItem(cacheKey);
      const cacheTime = localStorage.getItem(`${cacheKey}_time`);

      if (cached !== null && cacheTime !== null) {
        const age = (Date.now() - cacheTime) / 1000 / 60 / 60; // Cache age in hours
        if (age < 2) { // Cache is less than 2 hours old
          return JSON.parse(cached);
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
      return rejectWithValue(error.message);
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
        projectCardImages.forEach(function (element) {
          state.data.forEach((el, i) => {
            if (element.name.toLowerCase() === el.name.toLowerCase()) {
              el.image = element.image;
            }
          });
        });
      })
      .addCase(fetchGitHubRepos.rejected, (state, action) => {
        state.isLoading = false;
        state.data = cached;
        projectCardImages.forEach(function (element) {
          state.data.forEach((el, i) => {
            if (element.name.toLowerCase() === el.name.toLowerCase()) {
              el.image = element.image;
            }
          });
      });
})
  }
}
)

export const selectIsLoading = (state) => state.allRepositories.isLoading;
export const selectError = (state) => state.allRepositories.error;
export const selectData = (state) => state.allRepositories.data;

export default allRepositoriesSlice.reducer;
