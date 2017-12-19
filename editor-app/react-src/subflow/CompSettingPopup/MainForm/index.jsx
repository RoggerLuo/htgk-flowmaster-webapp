import React from 'react'
import SolidFrame from '../../../presentations/SolidFrame/SolidFrame'
import {connect} from 'react-redux'
import Header from '../Form/Header'
import Group from './GroupContainer'

const MainForm = ({ currentRepo, dispatch }) => {
    if(!currentRepo) return null
    const leftFields = currentRepo.leftFields || []
    return(
        <SolidFrame innerStyle={{padding:'0px'}} outerStyle={{width:'620px'}}>
            <Header />
            <div style={{padding:'10px 20px'}}>
                {
                    leftFields.map((el,ind)=>(
                        <Group leftData={el} key={ind}/>
                    ))
                }
            </div>
            <div style={{height:'20px',width:'100%'}}></div>
        </SolidFrame>
    )
}

export default global.connect2redux('subflow',MainForm)




/*
mainRight={mainRight} dispatch={dispatch}
// const mainRight = currentRepo.mainRight || {}
*/




// const mapStateToProps = (state) => {
//     const repo = state.subflow.repo
//     const id = state.subflow.id
//     const currentRepo = repo.filter((el,index)=>el.id == id) 
//     if(currentRepo.length==0) return false
//     return {currentRepo:currentRepo[0]} 
// }
// const mapDispatchToProps = (dispatch) => {
//     return {dispatch}
// }
// export default connect(mapStateToProps,mapDispatchToProps)(MainForm)    




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

