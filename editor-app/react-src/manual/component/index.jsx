import React from 'react'
import Representation from './p'

const Component = ({ currentRepo }) => {
    if(!currentRepo) return null
    return(<Representation data={currentRepo.data||[]} />)
}

export default rdx.connect('manual', Component)
