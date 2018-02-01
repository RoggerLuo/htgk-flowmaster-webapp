import React from 'react'
import {connect} from 'react-redux'
import Button from '../DropdownButton'
import confirmGenerator from '../confirmGenerator'

const UserTaskButtonConf = ({currentRepo,children,isEmpty}) => { 
    if(!currentRepo) return null
    const cate = currentRepo.data && currentRepo.data[0] && currentRepo.data[0].cate || ''

    const add = (item) => {
        rdx.dispatch({type:'usertask/addRole',item})
        rdx.save()
    }
    const clear = () => {
        rdx.dispatch({type:'usertask/clear'})
        rdx.save()
    }
        
    const params = {
        xClass:{marginTop:'5px',right:'12px'},
        confirm:confirmGenerator({cate,add,clear}),
        existCate:cate,
        groupInd:0,
        isEmpty
    }
    return ( 
        <Button {...params}> 
            {children}
        </Button>
    )
}

export default rdx.connect('usertask',UserTaskButtonConf)

//hidePrevious={'usertask'}