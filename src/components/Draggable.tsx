import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';

export default function Draggable({ children, elementId }: { children: JSX.Element; elementId: string }) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: elementId });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		backgroundColor: 'white',
		width: '400px',
		height: '150px'
	};

	// eslint-disable-next-line react/display-name
	return (
		<div ref={setNodeRef} {...attributes} {...listeners} style={style}>
			<Memo>{children}</Memo>
		</div>
	);
}

function Memo({ children }: { children: JSX.Element }) {
	return React.useMemo(() => children, [children]);
}
