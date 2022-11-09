import { Dispatch, SetStateAction, useState } from 'react';
import LinkCard from './LinkCard';
import { DndContext, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { CustomMouseSensor, CustomKeyboardSensor } from '../helpers/dnd-kitCustomSensors';
import {
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
	arrayMove,
} from '@dnd-kit/sortable';
import { DragEndEvent } from '@dnd-kit/core/dist/types';
import { Link } from '../types/UserContentTypes';
import Draggable from './Draggable';
import styled from '../styles/LinkCardContainer.module.css';

interface IProps {
	pageLinks: Link[];
	setRefresh: Dispatch<SetStateAction<number>>;
	slug: string;
}
//! fix keyboard sensor or nah idk
function LinkCardContainer({ setRefresh, slug, pageLinks }: IProps) {
	const [links, setLinks] = useState<Link[]>(pageLinks);

	const sensors = useSensors(
		useSensor(CustomMouseSensor),
		useSensor(CustomKeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);
	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={links} strategy={verticalListSortingStrategy}>
				<div className={styled.container}>
					<button className={styled.newLinkCard}>New Link</button>
					{links.map((link: Link) => (
						<Draggable key={link.id} elementId={link.id}>
							<LinkCard link={link} setRefresh={setRefresh} slug={slug} />
						</Draggable>
					))}
				</div>
			</SortableContext>
		</DndContext>
	);

	function handleDragEnd(e: DragEndEvent) {
		const { active, over } = e;

		const oldIndex = links.findIndex(link => link.id === active.id);
		const newIndex = links.findIndex(link => link.id === over?.id);

		if (over !== null && active.id !== over.id) {
			setLinks(
				arrayMove(links, oldIndex, newIndex).map((link, index) => ({
					...link,
					order: index,
				}))
			);
		}
	}
}

export default LinkCardContainer;
