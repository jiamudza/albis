import React, { useState } from 'react'

const Tatibmain = (file: { file: string }) => {
    const [popUp, setPopup] = useState(false);
  return (
    <div className="rounded-lg">
        <iframe
            src={file.file}
            width="100%"
            height="100%"
            style={{
                border: 0,
                minHeight: '100vh',
            }}
            className="rounded-lg"
        />
    </div>
  )
}

export default Tatibmain