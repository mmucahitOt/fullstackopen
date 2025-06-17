import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const FilterAnecdotes = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }

  return (
    <div>
    filter <input onChange={handleChange} />
    </div>
  );
};

export default FilterAnecdotes;