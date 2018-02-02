import React from 'react'
import { connect } from 'react-redux'
import RolesFrameGenerator from './RolesFrameGenerator'
import popupConfig from '../DropdownButton/getButtonList/SQL/popupConfig'
function ConfiguredRoleComp({ data, cate, index, dispatch }) { //index是groupIndex
    const del = (characterIndex) => {
        return function() {
            dispatch({ type: 'parallel/delelteRole', groupIndex: index, characterIndex })
            activeSave()
        }
    }
    const add = (item) => {
        dispatch({ type: 'parallel/addChar', item, index })
        activeSave()
    }
    const clear = () => {
        dispatch({ type: 'parallel/clear', index })
        activeSave()
    }
    const edit = () => {
        const cb = (item) => {
            clear()
            add(item)
        }
        dispatch({type:'sql/reload',savedSqlState:data[0].sqlState})
        dispatch(popupConfig(cb)(index))
        activeSave()
    }
    const { DefaultContainer, DbRoleContainer } = RolesFrameGenerator({ edit, del, add, clear })
    switch(cate){
        case 'fromDb':
            return (<DbRoleContainer data={data} index={index}/>)
        default:
            return (<DefaultContainer data={data}/>)
    }
}

const mapStateToProps = (state) => {
    return { state }
}
const mapDispatchToProps = (dispatch) => {
    return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfiguredRoleComp)
