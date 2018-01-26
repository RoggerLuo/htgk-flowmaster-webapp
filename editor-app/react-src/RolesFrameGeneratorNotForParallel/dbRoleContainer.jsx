import React from 'react'
import SolidFrame from '../presentations/SolidFrame/SolidFrame'
import popupConfig from '../DropdownButton/getButtonList/SQL/popupConfig'

export default ({ clear, add }) => {
    const cb = (item) => {
        clear()
        add(item)
    }
    return ({ data }) => { //const RoleComp =
        const edit = () => {
            rdx.dispatch({type:'sql/reload',savedSqlState:data[0].sqlState})
            rdx.dispatch(popupConfig( cb, 0 ))
            rdx.save()
            window.callShadow()
        }
        const text = data && data[0] && data[0].sql|| '' 
        return (<SolidFrame>
            <div style={{padding:'0px 5px 10px 5px',fontSize: '12px',color: '#333333'}}>{text}</div>
            <div style={{textAlign:'right'}}>
                <i onClick={edit} style={{paddingLeft: '1px'}} className="icon iconfont icon-edit"></i>
                <span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
                <i onClick={clear} style={{paddingLeft: '1px'}} className="icon iconfont icon-shanchu"></i>
            </div>
        </SolidFrame>)   
    }
}

