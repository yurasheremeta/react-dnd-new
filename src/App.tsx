import React, { Component } from 'react';

import DragAroundNaive from './Naive';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from "react-dnd";
import MyPDFeReader from './Naive/MyPDFReader';

class App extends Component {
  render() {

    return (
      
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="App" style={{ margin: 100 }}>
          <header className="App-header">
            <DragAroundNaive />
          </header>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default App;
