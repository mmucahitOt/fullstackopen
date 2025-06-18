import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote, selectAnecdotesByFilter } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(selectAnecdotesByFilter)
  
  const vote = (anecdote) => {
    dispatch(voteAnecdote({ id: anecdote.id }))
    dispatch(setNotification(`you voted for '${anecdote.content}'`))
  }

  return (
    <div>
         {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnecdoteList;