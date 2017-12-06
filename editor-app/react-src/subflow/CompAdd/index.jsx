import React from 'react'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import Group from './Group'
import { connect } from 'react-redux'
// const data = [
//     {
//         groupTitle:'我是标题我是标题',
//         data:[
//             {value:123,text:'text1text1text1',checked:false},
//             {value:123,text:'text2text2text2',checked:false},
//             {value:123,text:'text3text3text3',checked:false},
//             {value:123,text:'text4text4text4',checked:false}
//         ]
//     }
// ]
const AddComp = ({ currentRepo, put, add }) => {
    const data = []
    window.processList.forEach((el)=>{
        if(!el.categoryName) el.categoryName = "defaultCategory"
        if(!data.some(ele=>ele.groupTitle==el.categoryName)){
            data.push({groupTitle:el.categoryName})
        }
    })
    data.forEach(el=>{
        el.data = window.processList
            .filter(ele=>ele.categoryName==el.groupTitle)
            .map(ele=>({
                versionId:ele.versionId,
                text:ele.name,
                value:ele.id,
                checked:false
            }))
    })
    return(
        <div className="add-subflow" style={{width:'520px'}}>
            {data.map((el,ind)=><Group key={ind} index={ind} data={el}/>)}
            <div style={{height:'12px',width:'1px'}}></div>

            <div>已选择</div>
            <SolidFrame>
                <div style={{height:'50px'}}>{currentRepo.subProcess&&currentRepo.subProcess.name||''}</div>
            </SolidFrame>
        </div>
    )
}

import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(AddComp)

const mapStateToProps = (state) => {
    const repo = state.subflow.repo
    const id = state.subflow.id
    const filteredRepo = repo.filter((el,index)=>el.id == id) || false
    const currentRepo = filteredRepo && filteredRepo[0] || false
    return {currentRepo} 
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp)

/*
const Group = ({index,data}) => {
    return (<div>

        <i style={{cursor:'pointer',fontSize:'20px', transform: 'rotate(-90deg)'}} className="icon iconfont icon-sanjiao1"></i>
        {data.title}
        {data.data.map((el,ind) => <List key={ind} index2={ind} index={index} text={el.text}/>)}
    </div>)
}
*/