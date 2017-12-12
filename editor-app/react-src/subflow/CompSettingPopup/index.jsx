import React from 'react'
import { connect } from 'react-redux'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
// import List from './List'
// import Group from './Group'
import connectPut from 'react-put'
import Dropdown from '../../basicComp/Dropdown'
import './style.less'
import FirstHalf from './FirstHalf'
import Form from './Form'

export default function(){ //data是 currentRepo的data //data
    const AddComp = ({ currentRepo, put, add }) => {//data,
        if(!currentRepo) return null
        const data = currentRepo.data || []
        return(
            <div className="setting-subflow" style={{width:'100%'}}>


                <FirstHalf data={data}/>


                <div className="property-row-title" style={{fontSize:'14px'}}> 子流程内容设置 </div>
                <div className="property-row-title" style={{fontSize:'14px'}}> 主表 </div>


                <Form />


                <div className="property-row-title" style={{fontSize:'14px'}}> 子表单</div>
                

                <Form />


            </div>
        )
    }
    const options = {mapPropToDictionary: (props)=>window.reactI18n}
    const ConnectedApp = connectPut(options)(AddComp)
    // return ConnectedApp

    const mapStateToProps = (state) => {
        const repo = state.subflow.repo
        const id = state.subflow.id
        const currentRepos = repo.filter((el,index)=>el.id == id)
        if(!currentRepos[0]) return false
        const currentRepo = currentRepos[0]
        return {currentRepo} 
    }
    const mapDispatchToProps = (dispatch) => ({dispatch})
    return connect(mapStateToProps,mapDispatchToProps)(ConnectedApp)
}
