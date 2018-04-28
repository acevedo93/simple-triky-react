import React from 'react'
import Modal from 'react-modal'
import Controls from '../Controls/Controls'
import Board from '../Board/Board'
import ModalContent from '../Modal/ModalContent'

import style from '../styles.css'



  Modal.setAppElement('#root')

class Canvas extends React.Component {

    constructor(props){
        super(props)
        //tablero inicial que luego atualizara el estado 
        this.boardControl= [['','',''],['','',''],['','','']]
        this.XControl =   [['','',''],['','',''],['','','']]
        this.OControl =  [['','',''],['','',''],['','','']]
        this.state={
            valControl :'x',
            board : this.boardControl,
            schematurns : {
                schemaX : this.XControl,
                schemaO :  this.OControl
            },
            listenWin:{
                turn: '',
                win: false
            },
            countWin:{
                winsX:0,
                winsO:0
            },
            modalIsOpen: false,
            modalAnimation: false,
        }
        this.changeValControl = this.changeValControl.bind(this)
        this.listenClick = this.listenClick.bind(this)
        this.checkInSchemas = this.checkInSchemas.bind(this)
        this.conditions = this.conditions.bind(this)
        this.checkWinner = this.checkWinner.bind(this)
        this.reset = this.reset.bind(this)
        this.openModal = this.openModal.bind(this);
        
        this.closeModal = this.closeModal.bind(this);
    }
    
    changeValControl (turn){
        this.setState({
            valControl:turn
        })
    }

    listenClick(x,i){
        if(!this.boardControl[x][i]){ 
            this.boardControl[x][i]=this.state.valControl
            this.setState ({
                board:this.boardControl
            })
        }
        if(this.state.valControl === 'x') { 
            this.checkInSchemas(this.state.valControl,this.state.schematurns.schemaX,x,i)
             this.changeValControl('o')   
        }
        else if(this.state.valControl === 'o') {
            this.checkInSchemas(this.state.valControl,this.state.schematurns.schemaO,x,i)
            this.changeValControl('x')  
        }
    }

    checkInSchemas(turn,schema,x,i){

           if(schema === undefined){
               return false
           } else {
               schema[x][i] = 'I'
               this.conditions(turn,schema)
           }
         
        }
    conditions(turn,schema) {

        //funcion para verificar el empate
        // 1 se filtran todos los valores que tienen contenido  luego se verifica la longitud sumada
        // en cada fila se verifican si existen con la longitud y luego cuando la ongitud sea 0 se dara un empate 

        let empate = this.state.board.map(row => row.filter(column => column !== '').length < 3  ).filter(ve => ve === true).length
         
        if(!empate) this.checkWinner(null,'Empate')  
        
        // condicion 1 ( horizontal)
        
            if(schema[0][0] !== "" && schema[0][1] !== "" && schema[0][2] !== ""){
                this.checkWinner(schema,turn)
            }
            if(schema[1][0] !== "" && schema[1][1] !== "" && schema[1][2] !== ""){
                this.checkWinner(schema,turn)
            }
            if(schema[2][0] !== "" && schema[2][1] !== "" && schema[2][2] !== ""){
                this.checkWinner(schema,turn)
            }
        //condicion 2  (vertical)
            if(schema[0][0] !== "" && schema[1][0] !== "" && schema[2][0] !== ""){
                this.checkWinner(schema,turn)
            }
            if(schema[0][1] !== "" && schema[1][1] !== "" && schema[2][1] !== ""){
                this.checkWinner(schema,turn)
            }
            if(schema[0][2] !== "" && schema[1][2] !== "" && schema[2][2] !== ""){
                this.checkWinner(schema,turn)
            }
        //condition 3 (diagonal)
            if(schema[0][0] !== "" && schema[1][1] !== "" && schema[2][2] !== ""){
                this.checkWinner(schema,turn)
            }
            if(schema[2][0] !== "" && schema[1][1] !== "" && schema[0][2] !== ""){
                this.checkWinner(schema,turn)
            }

    }
    checkWinner(schema,turn) {
        let winner = turn
        console.log(winner);
       this.setState({
           listenWin:{
               turn : winner,
               win:true
           }
       })
       this.reset(turn)        
    }
    openModal() {
        this.setState({modalIsOpen: true,modalAnimation:true});
      }
      closeModal() {
        this.setState({modalIsOpen: false,modalAnimation:false});
      }
    
    reset (turn) {
       
       this.openModal();
       setTimeout(()=>{

        this.boardControl= [['','',''],['','',''],['','','']]
        this.XControl =   [['','',''],['','',''],['','','']]
        this.OControl =  [['','',''],['','',''],['','','']]
        this.setState({
            valControl :'x',
            board : this.boardControl,
            schematurns : {
                schemaX : this.XControl,    
                schemaO :  this.OControl
            },
            listenWin:{
                turn: '',
                win: false
            },
            countWin:{
                winsX:(turn === 'x') ? this.state.countWin.winsX + 1 : this.state.countWin.winsX,
                winsO:(turn === 'o') ? this.state.countWin.winsO + 1 : this.state.countWin.winsO,
            }

        })
        this.closeModal();
       },2500)
    }

    render(){
        return(
            <div className = {style.mainCanvas} >
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        className = {style.mainModal}
                        contentLabel="Example Modal"> 
                        <ModalContent winner = { this.state.listenWin.turn} />
                    </Modal>
                <Controls valControl = {this.state.valControl} {...this.state.countWin}/>
                <Board listenClick= {this.listenClick}
                board={this.state.board}/> 
            </div>
        )
    }
}

export default Canvas