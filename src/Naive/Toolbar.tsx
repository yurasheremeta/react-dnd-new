import * as React from 'react';
import Box from './Box';
// import styled from 'styled-components';

const styles: React.CSSProperties = {
	width: 300,
	height: 300,
	border: '1px solid black',
    position: 'relative',
   margin: 'auto'
}

interface ToolbarProps {
    toolbarRef: any
}
export class Toolbar extends React.Component<ToolbarProps> {
    render() {
       const { toolbarRef } = this.props;
       
        return(
            
            <div style={styles} ref ={toolbarRef}>
            {/* <Wrapper ref={this.toolbar}> */}
            <Box id="#1" left={0} top={0}  >Item 1</Box>
            <Box id="#2" left={0} top={40}>Item 2</Box>
            <Box id="#3" left={0} top={80} >Item 3</Box>
            <Box id="#4" left={0} top={120}>Item 4</Box>
            <Box id="#5" left={0} top={160}>Item 5</Box>
            <Box id="#6" left={0} top={200}>Item 6</Box>
            <Box id="#7" left={20} top={240}>Item 7</Box>
           </div>
        )
    }
}