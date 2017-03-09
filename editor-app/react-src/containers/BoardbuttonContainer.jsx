import React,{createClass} from 'react'
import { connect } from 'react-redux'
import store from '../../redux/configureStore.js'
import Boardbutton from '../presentations/Button/Boardbutton'
import HigherLevel from '../popup/HigherLevelContainer'
import Org from '../popup/OrgContainer'

const BoardbuttonContainer = createClass({ 
    getInitialState(){
        return {
            display:'none'
        }
    },
    toggle(){
        if(this.state.display=='none'){
            this.setState({display:''})
        }else{
            this.setState({display:'none'})
        }
    },
    close(){
        this.setState({display:'none'})
    },
    render(){
        
        const dispatch = this.props.dispatch
        const confirm = this.props.popupConfirm //向parallel redux里添加character
        
        const popupConfirm = (category) => {
            let text=''
            switch(category){
                case 'boss':
                    text = '上'+store.getState().dropdown.dropdown1.text+'级领导'
                break
                case 'role':
                    text = '最近'+store.getState().dropdown.dropdown1.text+'级分管，' + store.getState().dropdown.dropdown2.text
                break
                case 'user':
                    text = '上'+store.getState().dropdown.dropdown1.text+'级领导'
                break
            }
            const item = {
                cate:category,
                value:store.getState().dropdown.dropdown1.value,
                value2:store.getState().dropdown.dropdown2.value,
                text
            }

            confirm(item)
        }
        const action1 = {
            type:'callPopup',
            confirm:()=>{popupConfirm('boss')},
            content:HigherLevel,
            text:this.props.put('button.option1'),
            height:'45%',
            width:'44%'
        }
        const action2 = {
            type:'callPopup',
            height:'45%',
            confirm:()=>{popupConfirm('role')},
            content:Org,
            text:this.props.put('button.option2'),
            width:'44%'
        }
        const action3 = {
            height:'66%',
            type:'callPopup',
            confirm:()=>{popupConfirm('user')},
            content:Org,
            text:this.props.put('button.option3')
        }
        const buttonOptions = [
            action1,action2,action3
        ]
        const data = buttonOptions.map((el,index)=>{
            return {text:el.text,click(){dispatch(el)}}
        })
        return (
            <Boardbutton  {...{display:this.state.display,toggle:this.toggle,close:this.close,data}}>
                {this.props.children}
            </Boardbutton>
        )
    }
})

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}


import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(BoardbuttonContainer)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedApp)


