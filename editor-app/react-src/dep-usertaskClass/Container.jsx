import React,{createClass} from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Presentation from './Presentation'

export default function(reduceName){
    const Component = ({ currentRepo }) => {
        if(!currentRepo) return null
        return(<Presentation data={currentRepo.data||[]} />)
    }
    return rdx.connect(reduceName, Component)
}
