import React from 'react'
import P from './p'

const Usertask = ({ currentRepo }) => {
    if(!currentRepo) return null
    return(<P data={currentRepo.data||[]} />)
}

export default rdx.connect('usertask',Usertask)
