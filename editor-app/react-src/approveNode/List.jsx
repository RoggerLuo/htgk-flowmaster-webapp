import React from 'react'
import CharacterContainer from './CharacterContainer'
import SolidFrame from '../presentations/SolidFrame/SolidFrame'

export default ({ data, cate }) => {
    if(cate == "fromDb"){
        const text = data && data[0] && data[0].dataSourceSTDdata && data[0].dataSourceSTDdata.sql||''
        return (<SolidFrame>
            <div style={{padding:'0px 5px 10px 5px',fontSize: '12px',color: '#333333'}}>{text}</div>
            <div style={{textAlign:'right'}}>
                <i style={{paddingLeft: '1px'}} className="icon iconfont icon-edit"></i>
                &nbsp;
                <i style={{paddingLeft: '1px'}} className="icon iconfont icon-shanchu"></i>
            </div>
        </SolidFrame>)
    }
    
    return (
        <SolidFrame>
            <div style={{padding:'2px'}}>
                {data.map((el,index)=>{ 
                    return (<CharacterContainer index={index} el={el} key={index} />) 
                })}
            </div>
        </SolidFrame> 
    )
}
