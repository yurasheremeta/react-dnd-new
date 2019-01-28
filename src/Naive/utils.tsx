export const getSize = (divWorkspace: string) => {
	const element = document.querySelector(divWorkspace) as HTMLDivElement;
	const workSpace = element.getBoundingClientRect() as DOMRect;
	return workSpace;
}
export const getLeftPosition = (item: any , delta: any) => {
	const left = Math.round(item.left + delta.x);
	return left;
}

export const getTopPosition = (item : any , delta: any) => {
	const top = Math.round(item.top + delta.y);
	return top;
}

export const checkIfItemInWorkspace = (left: number , top: number) => {
	if (left < 0 || top < 0 ) {
		return;
	}

}