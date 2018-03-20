import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

export default function renderDom(R){
    render(
        <Provider store={rdx.store}>
            <R/>
        </Provider>
        , 
        document.getElementById('tpl-placeholder')
    )
}
