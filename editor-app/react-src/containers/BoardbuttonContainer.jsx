/*
    这是通用的buttonContainer
    对button的视图进行了数据逻辑的第一次包装，指定了popup的大小、内容，标题，还有确定函数
    
    留出了confirm和action3的接口，传入函数的实现
*/
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
        const xClass = this.props.xClass
        const dispatch = this.props.dispatch
        const confirm = this.props.popupConfirm //向parallel redux里添加character
        const action3 = this.props.action3

        const popupConfirm = (category) => {
            if(category =='role'){
                if(store.getState().dropdown.dropdown2.value=='initial'){
                    window.showAlert('尚无角色可选择')
                    return 
                }
            }
            let text=''
            switch(category){
                case 'boss':
                    text = '上'+store.getState().dropdown.dropdown1.text+'级领导'
                break
                case 'role':
                    text = '最近'+store.getState().dropdown.dropdown1.text+'级分管，' + store.getState().dropdown.dropdown2.text
                break
            }
            const item = {
                cate:category,
                value:store.getState().dropdown.dropdown1.value,
                value2:store.getState().dropdown.dropdown2.value,
                text
            }
            confirm(item)

            store.dispatch({type:'dropdown1Choose',item:{text:'一',value:'1'}})

        }
        const action1 = {
            type:'callPopup',
            confirm:()=>{popupConfirm('boss')},
            content:HigherLevel,
            text:this.props.put('button.option1'),
            height:'45%',
            width:'38%'
        }
        const action2 = {
            type:'callPopup',
            height:'45%',
            confirm:()=>{popupConfirm('role')},
            content:Org,
            text:this.props.put('button.option2'),
            width:'38%'
        }

        const buttonOptions = [
            action1,action2,action3
        ]
        const data = buttonOptions.map((el,index)=>{
            return {text:el.text||'选择特定人员',click(){ //button click的 函数在这里
                if(el.type == 'callPopup'){
                    dispatch(el)
                    window.callShadow() //遮罩                    
                }else{
                    el()
                }
            }}
        })
        return (
            <Boardbutton  {...{display:this.state.display,toggle:this.toggle,close:this.close,data,xClass}}>
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


