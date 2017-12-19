import React from 'react'
import { connect } from 'react-redux'
import  './style'

const CirculationNextHalf = ({ put, currentRepo, dispatch }) => {
    const previousNodeSpecifiedChange = () => {
        dispatch({type:'circulation/previousNodeSpecifiedChange'})
        activeSave() 
    }
    const previousNodeSpecified = currentRepo.previousNodeSpecified
    return(
        <div>
            <div style={{height:'10px',width:'100%'}}></div>
            <label htmlFor={"previousNodeSpecified"} style={{cursor:'pointer'}}> 
                <div className="property-row-content"> 
                    允许上一节点处理人指定本节点审批人
                </div>
            </label>
            &nbsp;
            <input 
                onChange={previousNodeSpecifiedChange} 
                checked={previousNodeSpecified||false} 
                value={previousNodeSpecified||false}
                style={{cursor:'pointer'}} 
                id="previousNodeSpecified" 
                name="previousNodeSpecified" 
                type="checkbox" 

            />             
            <div className="property-row-content" style={{color: '#999999'}}> 
                从【特定节点审批人】【二次开发】获取的审批人类型不在选择范围中。 
            </div>
        </div>
    )
}
/*
<div className="property-row-title">{put('approveNode.remark.title')}</div>
<div className="property-row-content">{put('approveNode.remark.content')}</div>
*/
export default global.connect2redux('circulation',CirculationNextHalf)

// const mapStateToProps = (state) => {
//     const repo = state.service.repo
//     const id = state.service.id
//     const currentRepo = repo.filter((el,index)=>el.id == id) || false
//     return {currentRepo} 
// }
// const mapDispatchToProps = (dispatch) => {
//     return {dispatch}
// }
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ApproveNode)
