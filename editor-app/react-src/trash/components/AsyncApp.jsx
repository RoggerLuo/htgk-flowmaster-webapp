import React, { PropTypes } from 'react'

const AsyncApp = ({threads,testProp,testClick}) => (
    <h1>{testProp}</h1>
    <div>
      {threads.map(thread=>
        <button onClick={()=> testClick(thread)}>{thread}</button>
      )
      }
    </div>
)


AsyncApp.propTypes = {
  testProp: PropTypes.string.isRequired,
  threads: PropTypes.array.isRequired,
  testClick: PropTypes.func.isRequired
}

export default AsyncApp