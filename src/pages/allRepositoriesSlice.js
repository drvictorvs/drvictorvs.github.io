import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Logo from "../images/logo.svg";

// Data
// import { githubUsername, projectCardImages } from "../data";

const githubUsername = "drvictorvs";

export const projectCardImages = [
  {
    name: "example-1",
    image: Logo,
  },
];

const initialState = {
  error: "",
  isLoading: true,
  data: [],
};

export const url = `https://api.github.com/users/${githubUsername}/repos?per_page=10`;

export const fetchGitHubReops = createAsyncThunk(
  "allRepositories/fetchGitHubReops",
  async (thunkApi, { rejectWithValue }) => {
    try {
      const response = await fetch(url).then(function (res) {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res;
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(
        `Error: ${err.message}, check username in data.js (currently ${githubUsername})`
      );
    }
  }
);

export const allRepositoriesSlice = createSlice({
  name: "allRepositories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchGitHubReops.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchGitHubReops.fulfilled, (state, action) => {
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
      .addCase(fetchGitHubReops.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log(state.error);
      });
  },
});

export const selectIsLoading = (state) => state.allRepositories.isLoading;
export const selectError = (state) => state.allRepositories.error;
export const selectData = (state) => state.allRepositories.data;

export default allRepositoriesSlice.reducer;
