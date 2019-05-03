import React from 'react';
import { DragDropContextProvider } from "react-dnd";   
import HTML5Backend from 'react-dnd-html5-backend'
import Container from "./container";

class DndComponent extends React.Component
{
    render(){
    return(
        <DragDropContextProvider backend={HTML5Backend}>
        <Container/>
        </DragDropContextProvider>
    )}
}

export default DndComponent;