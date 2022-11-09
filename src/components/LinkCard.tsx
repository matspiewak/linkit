import { Dispatch, SetStateAction, useState } from 'react';
import styled from '../styles/link-card.module.css';
import { Link } from '../types/UserContentTypes';
import React from 'react';
import { GripVertical, Edit3, Image as LucideImage, Trash2, Eye, EyeOff } from 'lucide-react';
import { useOutsideClick } from '../hooks/useOutsideClick';

interface IProps {
	link: Link;
	setRefresh: Dispatch<SetStateAction<number>>;
	slug: string;
}
interface InputProps {
	initialText: string;
	type: 'title' | 'url';
}

function LinkCard({ link, setRefresh, slug }: IProps) {
	const [visible, setVisible] = useState<boolean>(link.visible);

	return (
		<div className={styled.card}>
			<div className={styled.drag}>
				<GripVertical size={24} data-dnd='true' />
			</div>
			<div className={styled.contentContainer}>
				<form className={styled.card_form}>
					<EditableTextInput initialText={link.text} type='title' />
					<EditableTextInput initialText={link.url} type='url' />
				</form>
				<LucideImage color={link.icon ? '#3BE153' : 'black'} />
			</div>
			<div className={styled.presentContainer}>
				{visible ? (
					<EyeOff onClick={() => setVisible(!visible)} />
				) : (
					<Eye onClick={() => setVisible(!visible)} />
				)}
				<Trash2 />
			</div>
		</div>
	);
}

function EditableTextInput({ initialText, type }: InputProps) {
	const [isEdited, setIsEdited] = useState(false);
	const [text, setText] = useState(initialText);

	const ref = useOutsideClick(() => setIsEdited(false));

	if (isEdited) {
		return (
			<>
				<input
					ref={ref}
					className={styled.link_card_input}
					type='text'
					name={type}
					onChange={e => {
						setText(e.target.value);
					}}
					onClick={e => e.currentTarget.select()}
					value={text}
				/>
			</>
		);
	}
	return (
		<p className={styled.link_card_paragraph} onClick={() => setIsEdited(true)}>
			{text} <Edit3 size={16} color='#3a3a3a' />
		</p>
	);
}

export default LinkCard;
