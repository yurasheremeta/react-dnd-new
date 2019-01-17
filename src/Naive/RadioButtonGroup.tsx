import * as React from 'react';

interface RadioButtonGroupProps {
    onChange: any
}
class RadioButtonGroup extends React.Component<RadioButtonGroupProps>{

    render(){
        
        return( 
            <form>
				<input value="1"  name= "radio" onChange={this.props.onChange} type="radio"/>
				<input value="2" name="radio" onChange={this.props.onChange} type="radio" />
				<input value="3" name="radio" onChange={this.props.onChange} type="radio" />
			</form>
            // <input type="radio" value={this.props.value} onChange={this.props.onChange}/>
        )
    }
}

export default RadioButtonGroup;