import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = forwardRef(({ children, otherRefOfTogglable, labelWhenVisible, labelWhenHidden, hasButton = true}, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      handleVisibility,
      getVisibility
    };
  });

  const getVisibility = () => {
    return isVisible;
  };

  const handleVisibility = (visibility) => {
    setIsVisible(visibility);
  };

  const handleButtonClick = () => {
    setIsVisible(!isVisible);
    otherRefOfTogglable.current.handleVisibility(isVisible);
  };

  return (
    <div>
      {isVisible && children}
      {hasButton && <button onClick={handleButtonClick}>{isVisible ? labelWhenVisible : labelWhenHidden}</button>}
    </div>
  );
});

export default Togglable;