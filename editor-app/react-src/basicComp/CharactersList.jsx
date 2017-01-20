import React,{createClass} from 'react';
import { render } from 'react-dom'
const CharactersList = ({data,clickCross}) => {
    /* 可以改成return的模式，这样你就可以加其他语句了 */
    // const clickCross = (e)=>{
    //   debugger
    //   e.target.getAttribute('data-index')
    // }
    return(
       <div className="characters">
           {
                data.map((el,index)=>{
                   let or = ''
                   
                   if( index >= 1 ){
                       or = <span className="or">或</span>
                   }
                   
                   return (
                       <div key={index} className="single-container">
                           {or}
                           <div className="character">
                               <span className="name">{el.text}</span><span className="cross" data-index={index} onClick={clickCross}>X</span>
                           </div>
                       </div>
                   )
               })
            }
       </div>
    )
}

export default CharactersList