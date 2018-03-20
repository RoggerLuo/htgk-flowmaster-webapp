import React from 'react'
import P from './p'

const Circulation = ({ currentRepo }) => {
    if(!currentRepo) return null
    const data = currentRepo.data||[]
    return(
        <P data={data}/>
    )
}
export default rdx.connect('circulation', Circulation)
