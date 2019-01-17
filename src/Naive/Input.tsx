import * as React from 'react';

interface InputProps {
    value: string
    onChange: any,

}
class Input extends React.Component<InputProps>{
    render() {
        return (
            <input type="text" value={this.props.value} onChange={this.props.onChange} />
        )
    }
}
export default Input;