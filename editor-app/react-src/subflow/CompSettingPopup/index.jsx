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

export default function(data){ //data是 currentRepo的data
    const AddComp = ({ currentRepo, put, add }) => {//data,
        // const data = currentRepo.data || []
        const getData = () => {
            return [{text:'123',value:'456'},{text:'1235',value:'4565'}]
        }
        const choosedOption = {text:'123',value:'456'}
        const choosed = (item)=>{
            // dispatch({type:'dropdown1Choose',item})
        }

        return(
            <div className="setting-subflow" style={{width:'100%'}}>

                <FirstHalf data={data}/>

                <div className="property-row-title"> 
                    子流程内容设置
                </div>

                <div className="property-row-title"> 
                    主表
                </div>
                <Form />

                
                <div className="property-row-title"> 
                    子表单
                </div>
                
                <Form />
            </div>
        )
    }
    const options = {mapPropToDictionary: (props)=>window.reactI18n}
    const ConnectedApp = connectPut(options)(AddComp)
    return ConnectedApp

    // const mapStateToProps = (state) => {
    //     const repo = state.subflow.repo
    //     const id = state.subflow.id
    //     const currentRepo = repo.filter((el,index)=>el.id == id) || false
    //     return {currentRepo} 
    // }
    // const mapDispatchToProps = (dispatch) => {
    //     return {dispatch}
    // }
    // return connect(
    //     mapStateToProps,
    //     mapDispatchToProps
    // )(ConnectedApp)

}
