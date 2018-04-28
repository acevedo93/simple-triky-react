import React from 'react'
import style from '../styles.css'



const Board = (props) => {

    const drawBoard = (listenClick,board) => {
        let TemplateBoard = board.map((item,x) => {
            return (
            <div  key={x} className = {style.mainBoard} >
                {
                    item.map((section,i) => {
                        return (
                          
                            <div  key={i}  onClick={()=>listenClick(x,i)} className = {style.grid}  >
                                {section}
                            </div>
                        )
                    })
                }
            </div>
            )
        })
        return TemplateBoard

    }

    return (
        <div>
            {drawBoard(props.listenClick,props.board)}
        </div>

    )
}


export default Board