import * as React from 'react'
import Container from './Container'
import Box from './Box';
import { Toolbar } from './Toolbar';
import { string } from 'prop-types';


export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number, title: string, value: string } }

}

export interface ContainerProps {
	moveBox: Function,
	setValueOf: Function;
	handleValueChange: Function;
}
const styles: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	flexWrap: 'wrap'

}

export default class DragAroundNaive extends React.Component<
{},
	 ContainerState
	> {
	toolbar: React.RefObject<HTMLDivElement>;
	constructor(props: ContainerProps) {
		super(props);
		this.toolbar = React.createRef();
		this.moveBox = this.moveBox.bind(this);
	}

	public state = {
		boxes: {},

	}

	handleValueChange = (id: string) => {
		return (event: any) => {
			console.log("eve" , event);
			
			const value = event.target.value;
			console.log("val", value);
			
			this.setState(prevState  => {
				console.log("prev", prevState);
				
				return { boxes: { ...prevState.boxes, [id]: { ...prevState.boxes[id], value: value } } };
			}, () => {
				console.log("stet", this.state)

			})


		}
		;
		
	}

	public moveBox(id: string, left: number, top: number , value: string) {
	
		this.setState(prevState => {
			if (prevState.boxes[id]) {
			
				return { boxes: { ...prevState.boxes, [id]: { ...prevState.boxes[id], left, top , value: value  } } };
			} else {
				
				return { boxes: { ...prevState.boxes, [id]: { left, top, title: id , value: value || ''} } };
			}
		
			
		
		})
	}
	
	public render() {
		return (
			<div >
				<div style={styles}>
					<p>ITEMS</p>
					<Toolbar toolbarRef={this.toolbar} />
					<Container boxes={this.state.boxes} toolbarRef={this.toolbar} moveBox={this.moveBox} handleValueChange={this.handleValueChange}/>
				</div>
				<div>
				</div>
			</div>
		)
	}
}
