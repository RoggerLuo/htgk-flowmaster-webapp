import React,{createClass} from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import Presentation from './Presentation'

const Usertask = ({ currentRepo }) => {
    if(!currentRepo) return null
    return(<Presentation data={currentRepo.data||[]} />)
}
const UsertaskContainer = rdx.connect('usertask',Usertask)

export default function(){
    render(
        <Provider store={rdx.store}>
                <UsertaskContainer />
        </Provider>
        ,
        document.getElementById('approvePropertyCtrl')
    )
}
