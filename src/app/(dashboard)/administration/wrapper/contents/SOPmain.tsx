import React from 'react'
import PropTypes from 'prop-types'

function SOPmain(url: { url: string }) {
    return (
        <div className="p-4">
            <iframe
                src={url.url}
                width="100%"
                height="100%"
                style={{
                    border: 0,
                    minHeight: '100vh',
                }}
            />
        </div>
    )
}

SOPmain.propTypes = {}

export default SOPmain
