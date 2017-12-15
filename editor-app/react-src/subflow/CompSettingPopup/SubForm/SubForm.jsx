import React from 'react'
import SolidFrame from '../../../presentations/SolidFrame/SolidFrame'
import {connect} from 'react-redux'
import { Header,Group } from './Form'

const SubForm = ({ currentRepo, dispatch }) => {
    if(!currentRepo) return null
    const leftFields = currentRepo.leftFields || []
    // debugger
    const mainRight = currentRepo.mainRight || {}
    return(
        <SolidFrame innerStyle={{padding:'0px'}} outerStyle={{width:'620px'}}>
            <Header />
            <div style={{padding:'10px 20px'}}>
                {
                    leftFields.filter(el=>el.type == 'sub_form').map((el,ind)=>(
                        <div key={ind}>
                            <div style={{color: '#999999', fontSize: '13px'}}>{el.title}</div>
                            {el.children.map((el2,ind2)=>(
                                <Group leftData={el2} mainRight={mainRight} dispatch={dispatch} key={ind2}/>
                                ) 
                            )}
                            <div style={{margin:'20px 0',height:'1px',borderTop:'0.5px solid #dcdcdc',width:'100%'}}></div>
                        </div>
                    ))
                }
            </div>
        </SolidFrame>
    )
}

const mapStateToProps = (state) => {
    const repo = state.subflow.repo
    const id = state.subflow.id
    const currentRepo = repo.filter((el,index)=>el.id == id) 
    if(currentRepo.length==0) return {data:[]}
    return {currentRepo:currentRepo[0]} 
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
export default connect(mapStateToProps,mapDispatchToProps)(SubForm)    




// class Groups extends React.Component { 
//     constructor(props) {
//         super(props)
//         this.click = this.click.bind(this)
//         this.state = {
//             rightOptions : this.props.rightOptions    
//         }
        
//     }
//     click(groupInd,optionInd){
//         const rightOptions = Object.assign({},this.state.rightOptions)
//         rightOptions.forEach((el,ind)=>{
//             if(el.placeholder == groupInd){
//                 el.placeholder = false
//             } 
//         })
//         rightOptions.forEach((el,ind)=>{
//             if(ind == optionInd){
//                 el.placeholder = groupInd
//             } 
//         })
//         this.setState({rightOptions})
//     }
//     render(){
//         return (
//             <div>
//             {
//                 this.props.leftFields.map((el,ind)=>(
//                     <Group data={el} key={ind} click={this.click} ind={ind}/>
//                 ))
//             }
//             </div>
//         )
//         // return (
//         //     <div className="todoapp">
//         //         <textarea onKeyDown={this.onkeydown} ref="myTA"></textarea>
//         //     </div>
//         // )
//     }
// }

