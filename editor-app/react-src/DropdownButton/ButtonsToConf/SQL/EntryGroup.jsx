import React,{createClass} from 'react';
import { connect } from 'react-redux'
import Dropdown from '../../../basicComp/Dropdown'
import { columnTypeProto, expressionProto, variableTypeProto } from './dataProto'

const Entry = ({columnName,columnType,expression,variableName,variableType,selectGenerator,index,onchangeGenerator}) => {
    const getDefault = () => ( {value: false,text: '请选择'} )
    let variableOptions = [getDefault()]
    if(variableType.value == 'userVarible') variableOptions = window.userProperties
    if(variableType.value == 'formVarible') variableOptions = window.formProperties
    return (
        <div>
            列名&nbsp; <input onChange={onchangeGenerator(index)} value={columnName} className="columnNameInput" type="text" />
            <Dropdown position={'absolute'} choosedOption={expression} data={expressionProto} choosed={selectGenerator(0,index)} width={'60px'}  margin={'0 5px'}/>
            <Dropdown position={'absolute'} choosedOption={columnType} data={columnTypeProto} choosed={selectGenerator(1,index)} width={'130px'} margin={'0 5px'}/>
            <Dropdown position={'absolute'} choosedOption={variableType} data={variableTypeProto} choosed={selectGenerator(2,index)} width={'130px'} margin={'0 5px'}/>
            <Dropdown position={'absolute'} choosedOption={variableName} data={variableOptions} choosed={selectGenerator(3,index)} width={'130px'} margin={'0 5px'}/>
        </div>
    )   
}

const Component = ({conditions,dispatch,put,choosedOption2}) => {    
    const selectGenerator = (number,index)=>{
        switch(number){
            case 0:
                return (item) => {
                    dispatch({type:'sql/expressionChoose',item,index})
                    activeSave()
                }
            case 1:
                return (item) => {
                    dispatch({type:'sql/columnTypeChoose',item,index})
                    activeSave()
                }
            case 2:
                return (item) => {
                    dispatch({type:'sql/variableTypeChoose',item,index})
                    activeSave()
                }
            case 3:
                return (item) => {
                    dispatch({type:'sql/variableNameChoose',item,index})
                    activeSave()
                }
        }
    }
    const onchange = (index) => {
        return (e) => {
            dispatch({type:'sql/optionInputChange',value:e.target.value,index})
        }
    }
    return (
        <div>
            {conditions.map((el,ind)=> <Entry {...el} key={ind} selectGenerator={selectGenerator} onchangeGenerator={onchange} index={ind}/>)}
        </div>
    )
}
  
const mapStateToProps = (state) => {
    const conditions = state.sql.conditions
    return {conditions}
}     
export default connect(mapStateToProps,(dispatch) => ({dispatch}))(rdx.i18nPut(Component))
