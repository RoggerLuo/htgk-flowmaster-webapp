import React,{createClass} from 'react';
import { render } from 'react-dom'
import './style'


const Component = createClass({ 
    getInitialState(){
        const step1 =  {
            step:'1',
            header:'10px solid rgba(0, 0, 0, 0.58)',
            leftBackground:'rgba(0, 0, 0, 0)',
            leftBorderBackground:'rgba(0, 0, 0, 0.58)',
            rightBackground:'rgba(0, 0, 0, 0.58)',
            rightBorderBackground:'rgba(0, 0, 0, 0)',
            middleBackground:'rgba(0, 0, 0, 0.58)'
        }

        return {currentStep:step1}
    },
    nextStep(){
        const step2 =  {
            step:'2',
            header:'10px solid rgba(0, 0, 0, 0.58)',
            leftBackground:'rgba(0, 0, 0, 0.58)',
            leftBorderBackground:'rgba(0, 0, 0, 0)',
            rightBackground:'rgba(0, 0, 0, 0.58)',
            rightBorderBackground:'rgba(0, 0, 0, 0)',
            middleBackground:'rgba(0, 0, 0, 0)'
        }
        const step3 =  {
            step:'3',
            header:'10px solid rgba(0, 0, 0, 0.58)',
            leftBackground:'rgba(0, 0, 0, 0.58)',
            leftBorderBackground:'rgba(0, 0, 0, 0)',
            rightBackground:'rgba(0, 0, 0, 0)',
            rightBorderBackground:'rgba(0, 0, 0, 0.58)',
            middleBackground:'rgba(0, 0, 0, 0.58)'
        }
        const final =  {
            step:'4',
            header:'10px solid rgba(0, 0, 0, 0)',
            leftBackground:'rgba(0, 0, 0, 0)',
            leftBorderBackground:'rgba(0, 0, 0, 0)',
            rightBackground:'rgba(0, 0, 0, 0)',
            rightBorderBackground:'rgba(0, 0, 0, 0)',
            middleBackground:'rgba(0, 0, 0, 0)'
        }

        switch(this.state.currentStep.step){
            case '1':
                this.setState({currentStep:step2})
                break
            case '2':
                this.setState({currentStep:step3,text:''})
                break
            case '3':
                this.setState({currentStep:final,text:'从左边点击或拖动功能点',display:'none'})
                break
        }

    },

    render(){
        return (
            <div className="cover" onClick={this.nextStep} style={{display:this.state.display}}>
                <div className="header"></div>
                <div className="body" style={{borderTop:this.state.currentStep.header}}>
                    <div style={{backgroundColor:this.state.currentStep.leftBackground}} className="left"></div>
                    <div style={{backgroundColor:this.state.currentStep.leftBorderBackground}} className="left-border"></div>
                    <div style={{backgroundColor:this.state.currentStep.middleBackground}} className="middle">
                        <div className="middle-text">{this.state.text}</div>
                    </div>
                    <div style={{backgroundColor:this.state.currentStep.rightBorderBackground}} className="right-border"></div>
                    <div style={{backgroundColor:this.state.currentStep.rightBackground}} className="right"></div>
                </div>
            </div>
        )
    }
})

let userGuide = window.localStorage.getItem('userGuide')
if(userGuide){
    
}else{
    //挂载
    render(
        <Component />
        ,
        document.getElementById('userGuideComponent')
    )
    // window.localStorage.setItem('userGuide','readed')
}

