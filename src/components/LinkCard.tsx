import { ChangeEvent, useState } from 'react';
import styled from '../styles/link-card.module.css';

interface IState {
	text: string;
	url: string;
}

function LinkCard({ link }: any) {
	const [linkInputs, setLinkInputs] = useState<IState>({
		text: link.text,
		url: link.url,
	});
	const [isEdited, setIsEdited] = useState({linkId: link.id, isEdited: false});
	const [icon, setIcon] = useState<string>('');
	const [isVisible, setIsVisible] = useState<boolean>(true);
	const [position, setPosition] = useState<number>(0);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		setLinkInputs({
			...linkInputs,
			[name]: e.target.value,
		});

	};
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		// setLinks([...links, { text: linkInputs.text, url: linkInputs.url, icon: icon, isVisible: isVisible, position: position }])
		setLinkInputs({ text: '', url: '' });
	};

	return (
		<div className={styled.card}>
			<div></div>
			<div>
				<form
					className={styled.card_form}
					onSubmit={e => handleSubmit(e)}
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
				</form>
				<div></div>
			</div>
			<div>
				<label className={styled.switch}>
					<input
						type='checkbox'
						checked={isVisible}
						onChange={() => setIsVisible(!isVisible)}
					/>
					<span className={styled.slider + ' ' + styled.round}></span>
				</label>
			</div>
		</div>
	);
}

export default LinkCard;
