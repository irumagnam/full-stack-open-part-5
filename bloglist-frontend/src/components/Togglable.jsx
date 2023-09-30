import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [isShowing, setIsShowing] = useState(false)
  const toggleVisibility = () => setIsShowing(!isShowing)
  const contentStyle = { display: isShowing ? '' : 'none' }
  useImperativeHandle(refs, () => ({ toggleVisibility }))

  return (
    <>
      <div>
        <button onClick={toggleVisibility}>
          {isShowing ? 'cancel' : buttonLabel}
        </button>
      </div>
      <div className='togglableContent' style={contentStyle}>
        {children}
      </div>
    </>
  )
})

export default Togglable