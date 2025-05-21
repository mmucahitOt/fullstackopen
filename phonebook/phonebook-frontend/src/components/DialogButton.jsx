const DialogButton = ({ message, handleDialogOpen, handleDialogClose }) => {
  const handleClick = () => {
    window.confirm(message) ? handleDialogOpen() : handleDialogClose();
  };

  return <button onClick={handleClick}>{message}</button>;
};

export default DialogButton;
