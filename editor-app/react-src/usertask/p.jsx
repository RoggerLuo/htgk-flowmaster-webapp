import React from 'react'
import  './style'
import Menu from './Menu'
import ApprovePool from './ApprovePool'
import ApproveSetting from './ApproveSetting'

const UsertaskPre = ({ data, put }) => {
    const isEmpty = data.length == 0
    const unfold = () => {
        try {
            fm.closeCurrDpdw && fm.closeCurrDpdw()
        } catch (error) {

        }
    }
    return(
        <div className="react-approve" onClick={unfold}  >
            <div className="row-title" style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{lineHeight: '30px'}} className="property-row-title-only-font">
                    {put('approveNode.title.staff')}
                </div>
                {!isEmpty?(
                    <Menu isEmpty={false}>    
                        <i style={{paddingLeft: '1px'}} className="icon iconfont icon-tianjia"></i>
                    </Menu>    
                ):null}
            </div>    

            {isEmpty?(
                <Menu isEmpty={true}>    
                    <div className="mybutton" >
                        {put('approveNode.button.add')}
                            <i className="icon iconfont icon-tianjia"></i>
                    </div>
                </Menu>    
            ):null}

            {!isEmpty?(
                <ApprovePool data={data}/>
            ):null}
            <ApproveSetting/>


            <div style={{height:'200px',width:'1px'}}></div>
        </div>
    )
}
/*
{
    title:'流程超时预警',
    oncheck:oncheckFactory('hasProcessTimeOut '),
    checked:currentRepo.hasProcessTimeOut ||false,
    defaultValue:'流程超时预警',
    inputValue:'currentRepo.allowForceEndText',
    onchange(e){
        // if(fm.isSpecificVersionEditMode) return
        // rdx.put(reduceName,'replace',['allowForceEndText'],e.target.value||'')
    }

}
*/
export default rdx.i18nPut(UsertaskPre)
