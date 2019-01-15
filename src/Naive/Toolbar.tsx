import * as React from 'react';
import Box from './Box';
import { number } from 'prop-types';
import { box } from './mock';

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

export interface BoxesProps {
    boxes: { [key: string]: { left: number, top: number, title: string } }

}

interface BoxProps {
    key: string,
    left: number,
    top: number,
    title: string
}


export class Toolbar extends React.Component<ToolbarProps, BoxProps> {
    
    render() {
        const {
            toolbarRef,

        } = this.props;
      
        return (

            <div style={styles} ref={toolbarRef}>
                {Object.keys(box).map(key => {
                    const { left, top, title, } = box[key];
                  
                    return (
                        <Box
                            key={key}
                            id={key}
                            left={left}
                            top={top}
                        >
                            {title}
                        </Box>

                    )
                })}
            </div>
        )
    }
}