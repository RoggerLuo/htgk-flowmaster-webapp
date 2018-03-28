import React from 'react'
import V from './v'
    
const Component = ({currentRepo,put}) => {    
    const param = {
        oninput(e){
            rdx.put('temp','touch')
            rdx.put('temp','replace',['callback_textarea'],e.target.value,'string')
        },
        value:currentRepo.callback_textarea||''
    }
    return (<V {...param}/>)
}

export default rdx.connect('temp', rdx.i18nPut(Component))
