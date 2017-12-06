import React,{createClass} from 'react';
import Dropdown from '../../../basicComp/Dropdown'
import EntryGroup from './EntryGroup'

export default function(savedSqlState){
    let conditions = []
    // let dataSourcesSelected = window.dataSources && window.dataSources[0] || {}
    // if(dataSourceRefSTD) {
    //     conditions = dataSourceRefSTD.conditions
    //     dataSourcesSelected = dataSourceRefSTD.dataSourceId        
    // }
    const ReactViewComp =  ({ addEntry, dataSource, chooseSource, textareaOnInput, sql, checked, checkChange, chooseDropdown }) => {
        return (
            <div style={{width:'701px',height:'411px'}}>
            <div className="popupButtonScrollLayer" style={{padding:'10px 50px',position:'absolute',width:'701px',height:'405px',overflow:'auto'}}>
                <div className="customRoleTitle">
                    获取的最终数值必须为人员ID或ID集合
                </div>
                <textarea onChange={textareaOnInput} value={sql} className="sqlTextarea" placeholder="点击编写SQL语句">
                </textarea>
                <div className="customRoleTitle">添加外部系统数据源</div>
                <div className="customRoleTitle">
                    数据源名称：
                    <Dropdown choosedOption={dataSource} data={window.dataSources} choosed={chooseSource}/>
                </div>
                <div style={{height:"15px",width:'1px'}}></div>

                <div className="customRoleTitle" style={{display:'flex',justifyContent:'space-between'}}>
                    <div>
                        <input onChange={checkChange} style={{cursor:'pointer'}} id="checkbox" name="checkbox" type="checkbox" value="checkbox" checked={checked} /> 
                        &nbsp;
                        <label htmlFor={"checkbox"} style={{cursor:'pointer'}}> 获取流程变量（表单变量/人员变量/环境变量）</label>
                        <div className="popupButtonGrey">支持变量作为参数进行查询</div>
                    </div>
                    {checked?(<i className="icon iconfont icon-tianjia" onClick={addEntry}>&nbsp;</i>):null}
                </div>

                {checked?(<div className="customRoleTitle" style={{marginBottom: '200px'}}>
                    <EntryGroup/>
                </div>):null}
            </div>
            </div>
        )
    } 
    return ReactViewComp
}
