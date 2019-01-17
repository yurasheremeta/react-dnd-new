import * as React from 'react'
import { DragSource, ConnectDragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const style: React.CSSProperties = {
	position: 'absolute',
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

const boxSource = {
	beginDrag(props: BoxProps) {
		const { id, left, top } = props;
		return {id, left, top }
	},
}

export interface BoxProps {
	id: any
	left: number
	top: number
	hideSourceOnDrag?: boolean
	boxRef?: any

}

interface BoxCollectedProps {
	connectDragSource: ConnectDragSource
	isDragging?: boolean
	
}

class Box extends React.Component<BoxProps & BoxCollectedProps> {
	public render() {
		const {
			hideSourceOnDrag,
			left,
			top,
			connectDragSource,
			isDragging,
			children,
			boxRef,
			id
		
		} = this.props
		if (isDragging && hideSourceOnDrag) {
			return null
		}

		const cStyle = { ...style, left, top };
		
		if (!left && !top) {
			cStyle.position = 'relative';
		}
		return connectDragSource(
			<div style={{ ...style, left, top }} ref={boxRef} id={id} >
			{children}
			</div>
		)
	}
}

export default DragSource<BoxProps, BoxCollectedProps>(
	ItemTypes.BOX,
	boxSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	}),
)(Box)
