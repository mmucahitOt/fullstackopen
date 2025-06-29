import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(
  (
    {
      children,
      otherRefOfTogglable,
      labelWhenVisible,
      labelWhenHidden,
      hasButton = true,
      onButtonClick,
      styles,
      buttonStyle,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false)

    useImperativeHandle(ref, () => {
      return {
        handleVisibility,
        getVisibility,
      }
    })

    const getVisibility = () => {
      return isVisible
    }

    const handleVisibility = (visibility) => {
      setIsVisible(visibility)
    }

    const handleButtonClick = () => {
      setIsVisible(!isVisible)
      if (onButtonClick) {
        onButtonClick()
      }
      if (otherRefOfTogglable) {
        otherRefOfTogglable.current.handleVisibility(isVisible)
      }
    }

    return (
      <div style={styles} className="d-flex justify-content-end">
        {isVisible && children}
        {hasButton && (
          <button style={buttonStyle} onClick={handleButtonClick} className="btn btn-primary">
            {isVisible ? labelWhenVisible : labelWhenHidden}
          </button>
        )}
      </div>
    )
  }
)

Togglable.displayName = 'Togglable'

export default Togglable
