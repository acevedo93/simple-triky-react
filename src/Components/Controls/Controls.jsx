import React from 'react'

import style from '../styles.css'


const Controls = (props) => {
    
    const checkVal = (valControl) => {
    
      let template = (valControl === 'o') 
        ?  
        <div>
            <label> turno de O </label>   
        </div> 
        : 
        <div>
            <label> turno de X </label>
        </div>
        return template
    }

    return (
        <div className = {style.mainControls}> 
            <div className = {style.ControlContent}> 
                <h2> TIC-TAC-TOE </h2>
                <span > X : {props.winsX}</span>
                <span > O : {props.winsO}</span>
            {checkVal(props.valControl)}
            </div>
        </div>
    )
}


export default Controls
