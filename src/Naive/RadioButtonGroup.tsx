import * as React from 'react';

interface RadioButtonGroupProps {
    onChange: any
}
class RadioButtonGroup extends React.Component<RadioButtonGroupProps>{
    render(){
        return( 
            <form>
				<input value="1"  name= "radio" onChange={this.props.onChange} type="radio" className="input1"/>
				<input value="2" name="radio" onChange={this.props.onChange} type="radio" className="input2" />
				<input value="3" name="radio" onChange={this.props.onChange} type="radio" className="input3"/>
			</form>
        )
    }
}
export default RadioButtonGroup;