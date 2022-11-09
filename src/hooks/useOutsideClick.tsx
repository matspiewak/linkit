import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
	const ref = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleClick = (e: any) => {
			if (ref.current && !ref.current.contains(e.target)) callback();
		};

		document.addEventListener('click', handleClick, true);

		return () => document.removeEventListener('click', handleClick, true);
	}, [callback]);

	return ref;
};
