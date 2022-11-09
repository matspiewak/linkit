import { useSortable } from '@dnd-kit/sortable';
import styled from '../styles/draggable.module.css';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';

export default function Draggable({ children, elementId }: { children: JSX.Element; elementId: string }) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: elementId });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};
	// eslint-disable-next-line react/display-name
	return (
		<div ref={setNodeRef} {...attributes} {...listeners} style={style} className={styled.draggable}>
			<Memo>{children}</Memo>
		</div>
	);
}

function Memo({ children }: { children: JSX.Element }) {
	return React.useMemo(() => children, [children]);
}
