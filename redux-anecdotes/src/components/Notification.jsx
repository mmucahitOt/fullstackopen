import { useSelector, useDispatch } from "react-redux";
import { selectNotification, clearNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch()

  const {message, timeoutDuration} = useSelector(selectNotification)
  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (message) {
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutDuration)
  }

  return (  
    <div style={message ? style : { display: "none" }}>
      {message}
    </div>
  )
}

export default Notification