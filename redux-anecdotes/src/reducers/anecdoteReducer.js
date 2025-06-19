import { createSlice, createSelector } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

// Selectors
export const selectAllAnecdotes = (state) => state.anecdotes;

export const selectAnecdoteById = createSelector(
  [selectAllAnecdotes, (state, id) => id],
  (anecdotes, id) => [...anecdotes].find((anecdote) => anecdote.id === id)
);

export const selectAnecdotesByVotes = createSelector(
  [selectAllAnecdotes],
  (anecdotes) => [...anecdotes].sort((a, b) => b.votes - a.votes)
);

export const selectAnecdotesByFilter = createSelector(
  [selectAllAnecdotes, (state) => state.filter],
  (anecdotes, filter) =>
    [...anecdotes].filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
);

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdoteSlices = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdoteSlices));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = ({ id }) => {
  return async (dispatch) => {
    await anecdoteService.vote(id);
    dispatch(initializeAnecdotes());
  };
};

export default anecdoteSlice.reducer;
