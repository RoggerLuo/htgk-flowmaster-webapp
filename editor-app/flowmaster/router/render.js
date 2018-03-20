import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

export default function renderDom(R,second){
    if(second){
        render(
            <Provider store={rdx.store}>
                <R/>
            </Provider>
            , 
            document.getElementById('tpl-placeholder2')
        )
    }else{
        render(
            <Provider store={rdx.store}>
                <R/>
            </Provider>
            , 
            document.getElementById('tpl-placeholder')
        )
        render(
            <div></div>
            , 
            document.getElementById('tpl-placeholder2')
        )
    }

}
