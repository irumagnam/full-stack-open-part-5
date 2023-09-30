import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [isShowing, setIsShowing] = useState(false)
  const showOrHide = () => setIsShowing(!isShowing)
  const contentStyle = { display: isShowing ? '' : 'none' }
  useImperativeHandle(refs, () => ({ showOrHide }))

  return (
    <>
      <div>
        <button onClick={showOrHide}>
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