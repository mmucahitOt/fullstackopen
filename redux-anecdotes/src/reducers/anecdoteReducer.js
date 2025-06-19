import { createSlice, createSelector } from "@reduxjs/toolkit";

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
    createAnecdote: (state, action) => {
      state.push(asObject(action.payload.content));
    },
    voteAnecdote: (state, action) => {
      const anecdote = state.find((a) => a.id === action.payload.id);
      anecdote.votes++;
    },
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

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
