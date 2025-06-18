import { useSelector, useDispatch } from "react-redux";
import { selectNotification, clearNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch()

  const notification = useSelector(selectNotification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification) {
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div style={notification ? style : { display: "none" }}>
      {notification}
    </div>
  )
}

export default Notification