import * as React from 'react';
import Box from './Box';
import { number } from 'prop-types';
import { box } from './mock';
import { SetPositionType } from './index';
import { BoxType } from './index';

const styles: React.CSSProperties = {
    width: 300,
    height: 300,
    border: '1px solid black',
    position: 'relative',
    margin: 'auto'
}

interface ToolbarProps {
    toolbarPositionX: number;
    toolbarPositionY: number;
    setPosition : SetPositionType,
}

export interface BoxesProps {
    boxes: BoxType;
}

interface BoxProps {
    key: string,
    left: number,
    top: number,
    title: string
}

export class Toolbar extends React.Component<ToolbarProps, BoxProps> {


    toolbarRef:React.RefObject<HTMLDivElement>;
    constructor(props: ToolbarProps){
        super(props);
        this.toolbarRef = React.createRef();
    }

    componentDidMount = () => {
       
       setTimeout(() => {
        const toolbar = this.toolbarRef.current as HTMLDivElement;
       const { x, y } = toolbar.getBoundingClientRect() as DOMRect;
       this.props.setPosition(x, y);
       })
    }
    render() {
    

        return (

            <div style={styles} ref={this.toolbarRef}>
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