import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import styled from '../styles/link-card.module.css';
import { Link } from '../types/UserContentTypes';
import React from 'react';

interface IProps {
	link: Link;
	setRefresh: Dispatch<SetStateAction<number>>;
	slug: string;
}
//! TODO MIGRATE CHECK VISIBLE
//! state is being reset because of useState is binded to the component position in the DOM, not the component itself
//? lift state up to the parent component?
function LinkCard({ link, setRefresh, slug }: IProps) {
	const [isEdited, setIsEdited] = useState({
		linkId: link.id,
		isEdited: false,
	});
	const [linkInputs, setLinkInputs] = useState<{ text: string; url: string }>({
		text: link.text,
		url: link.url,
	});

	const [icon, setIcon] = useState<string>('');
	const [visible, setVisible] = useState<boolean>(link.visible);

	return (
		<div className={styled.card}>
			<div style={{ width: '20px', backgroundColor: 'red' }} data-dnd='true'></div>
			<div>
				<form className={styled.card_form} onSubmit={handleSubmit}>
					{
						//! add isEditing state to set text and url values to <p> while its true, instad of keeping them as inputs
					}
					<input
						className={styled.interactable_input + ' ' + styled.text}
						type='text'
						value={linkInputs.text}
						name='text'
						onChange={handleInputChange}
						onClick={e => e.currentTarget.select()}
					/>
					<input
						className={styled.interactable_input}
						type='text'
						value={linkInputs.url}
						name='url'
						onChange={handleInputChange}
						onClick={e => e.currentTarget.select()}
					/>
					<button type='submit'>Submit</button>
				</form>
				<div></div>
			</div>
			<div>
				<label className={styled.switch}>
					<input
						type='checkbox'
						checked={visible}
						onChange={() => {
							setVisible(!visible);
						}}
					/>
					<span className={styled.slider + ' ' + styled.round}></span>
				</label>
			</div>
		</div>
	);

	function handleEdit(link: Link) {
		// dispatch({ type: 'EDIT_LINK_CARD', linkCard });
	} //? reducer is probably good idea here
	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const name = e.target.name;
		setLinkInputs({
			...linkInputs,
			[name]: e.target.value,
		});
	}
	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// dispatch({ type: 'test' });
		//!probably the session should contain the slug so only owner can revalidate
	}
}

export default LinkCard;
