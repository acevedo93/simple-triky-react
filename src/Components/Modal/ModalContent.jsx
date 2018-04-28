import React from 'react'
import style from '../styles.css'


const ModalContent  = (props) => (

   
    <div className={style.mainModalContent}>
        {props.winner ==='Empate' 
        ? <span> Empate </span>
        : <span>  Ganador : {props.winner}  </span>}
        
    </div>
)


export default ModalContent