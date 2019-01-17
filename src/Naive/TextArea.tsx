import * as React from 'react';

interface TextAreaProps {
    value: string
    onChange: any
}
class TextArea extends React.Component<TextAreaProps>{

    render(){
        
        return( 
            <textarea value={this.props.value} onChange={this.props.onChange}/>
        )
    }
}

export default TextArea;