const Notification = ({ notificationSpec }) => {
  console.log(notificationSpec);
  if (!notificationSpec) {
    return null;
  }

  return (
    <div
      style={{
        color: notificationSpec?.type === "error" ? "red" : "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      {notificationSpec.message}
    </div>
  );
};

export default Notification;
