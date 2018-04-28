import React from 'react';
import ReactDOM from 'react-dom';

import Canvas from './Components/Canvas/Canvas'
import style from './Components/styles.css'

const App = () =>{
    return(
        <div className = {style.mainContainer} >
        <Canvas/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

