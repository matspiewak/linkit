import { ChangeEvent, useState } from 'react';
import styled from '../styles/link-card.module.css';

interface IState {
	text: string;
	url: string;
}
//! TODO MIGRATE CHECK VISIBLE
function LinkCard({ link, setRefresh, slug }: any) {
	const [linkInputs, setLinkInputs] = useState<IState>({
		text: link.text,
		url: link.url,
	});
	const [isEdited, setIsEdited] = useState({
		linkId: link.id,
		isEdited: false,
	});
	const [icon, setIcon] = useState<string>('');
	const [visible, setVisible] = useState<boolean>(link.visible);
	const [order, setOrder] = useState<number>(0);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		setLinkInputs({
			...linkInputs,
			[name]: e.target.value,
		});
	};
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		fetch('/api/update', {
			method: 'POST',
			body: JSON.stringify({
				id: link.id,
				text: linkInputs.text,
				url: linkInputs.url,
				visible: visible,
				icon: icon,
			}),
		}).then(() => {
			fetch(
				//!probably the session should contain the slug so only owner can revalidate
				`/api/revalidate?title=${slug}`
			);
		});
		setTimeout(() => {
			setRefresh((prevValue: number) => prevValue + 1);
		}, 500);
	};

	return (
		<div className={styled.card}>
			<div></div>
			<div>
				<form
					className={styled.card_form}
					onSubmit={(e: any) => handleSubmit(e)}
				>
					<input
						className={
							styled.interactable_input + ' ' + styled.text
						}
						type='text'
						value={linkInputs.text}
						name='text'
						onChange={e => handleInputChange(e)}
						onClick={e => e.currentTarget.select()}
					/>
					<input
						className={styled.interactable_input}
						type='text'
						value={linkInputs.url}
						name='url'
						onChange={e => handleInputChange(e)}
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
						onChange={() => setVisible(!visible)}
					/>
					<span className={styled.slider + ' ' + styled.round}></span>
				</label>
			</div>
		</div>
	);
}

export default LinkCard;
