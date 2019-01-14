import * as React from 'react';
import Box from './Box';
import { number } from 'prop-types';
import { box } from './mock';
import Change from './ChangeItems';

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
    // box:React.RefObject<HTMLDivElement>; 
    // constructor(props: BoxProps & ToolbarProps){
    //     super(props)
    //     this.box = React.createRef();
    // }
 

    // setRefs = (ref: any) => {
    //     this.inputRefs.push(ref);  
    // //    const a = this.inputRefs.map(i => {
    // //           this.inputRefs[i].current;
    // //       })
    // //       console.log("a",a);
          
    // };
    
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
                             {/* <Change id={key}/> */}
                        </Box>

                    )
                })}
            </div>
        )
    }
}