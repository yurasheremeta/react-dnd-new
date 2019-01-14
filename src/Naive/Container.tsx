import * as React from 'react'
import {
	DropTarget,
	ConnectDropTarget,
	DropTargetMonitor,
	XYCoord,
} from 'react-dnd'
import ItemTypes from './ItemTypes'
import Box from './Box'

const update = require('immutability-helper')


const styles: React.CSSProperties = {
	width: 300,
	height: 300,
	border: '1px solid black',
	position: 'relative'
}

const boxTarget = {
	drop(
		props: ContainerProps,
		monitor: DropTargetMonitor,
		component: Container | null,
	) {
		if (!component) {
			return
		}
		const item = monitor.getItem();
		const delta = monitor.getDifferenceFromInitialOffset() as XYCoord
		const workArea = document.querySelector("div.workspace");
		const q = props.toolbarRef.current;
		const toolbarX = (q as any).getBoundingClientRect().x;
		const toolbarY = (q as any).getBoundingClientRect().y;
		const workSpaceX = (workArea as any).getBoundingClientRect().x;
		const workSpaceY = (workArea as any).getBoundingClientRect().y;
		const workSpace = (workArea as any).getBoundingClientRect();
		console.log("qqqq", workSpace.left);
		console.log("workSpace", workSpace);
		const box = document.querySelector("#" + item.id);
		const boxDom = (box as any).getBoundingClientRect();
		console.log("boxDom", boxDom);

		console.log("item", boxDom.y);
		console.log("item.aaa", boxDom.x);

		const d = Math.round(boxDom.x + boxDom.width);
		const aa = Math.round(boxDom.y + boxDom.height);
		console.log("workSpace.y", workSpace.y);
		console.log("boxDom.y", boxDom.y);
		
		if (props.boxes.hasOwnProperty(item.id)) {
			const left = Math.round(item.left + delta.x);
			const top = Math.round(item.top + delta.y);
			if (left < 0 || top < 0) {
				return;
			}

			props.moveBox(item.id, left, top, props.boxes.title)
		} else {
			const b = Math.round(workSpaceX - toolbarX);
			const c = Math.round(workSpaceY - toolbarY);
			const left = Math.round(item.left + delta.x - b);
			const top = Math.round(item.top + delta.y - c);
			console.log("left", left, "top", top);
			console.log("top", top);
			console.log("boxDom.x", boxDom.x);

			if (left < 0 || top < 0 || top > d || left > aa) {
				return;
			}

			props.moveBox(item.id, left, top);
		}

	},
}
export interface ContainerProps {
	toolbarRef: React.RefObject<HTMLDivElement>,
	moveBox: Function,
	boxes: any,

}

interface ContainerCollectedProps {
	connectDropTarget: ConnectDropTarget

}

export interface ContainerState {
	boxes: { [key: string]: { top: number; left: number, title: string, value: string } }

}	

class Container extends React.Component<
	ContainerProps & ContainerCollectedProps,
	ContainerState
	> {
		constructor(props: ContainerProps & ContainerCollectedProps){
			super(props);
			this.state ={ 
				boxes :{}
			}
			 this.handleValueChange = this.handleValueChange.bind(this);
		}
		 

		handleValueChange = (id: string ) => {
		 return  (event: any) => {
			this.setState(prevState => {
				return { boxes: { ...prevState.boxes, [id]: { ...prevState.boxes[id], value: event.target.value } } };
			})
		 }
		}

	changeItems = (id: string , value:string ) => {
		switch(id) {
			case "a":
			return (
				<input type="text" id="text" value={value || ''}  onChange={this.handleValueChange(id)}/>
			)
			case "b": 
			return(
				<textarea value="" onChange={this.handleValueChange(id)}/>
			)
			case "c":
			return(
				<div>
					 <input type="radio" />
				<input type="radio" />
				<input type="radio" />
				</div>
			   
			)
		}
	}

	public render() {
		const { connectDropTarget, boxes } = this.props

		console.log("boxes on the workspace", boxes);
		return connectDropTarget(
			<div>
				<div style={styles} className="workspace">
					{Object.keys(boxes).map(key => {
						const { left, top , value} = boxes[key]
						return (
							<Box
								key={key}
								id={key}
								left={left}
								top={top}
							>
							{
								this.changeItems(key , value)
							}
								{/* <Change id={key} handleChange={this.handleChange}/> */}
								
							</Box>
						)
					})}

				</div>
				{/* <button onClick={() => {
						this.setValueOf(id,left,top)
						
					} 
					
					}>Submit</button> */}
				<button onClick ={ () => console.log(this.props.boxes)}>submit</button>
			</div>
		)
	}
}

export default DropTarget<ContainerProps, ContainerCollectedProps>(
	ItemTypes.BOX,
	boxTarget,
	(connect: any) => ({
		connectDropTarget: connect.dropTarget(),
	}),
)(Container)
