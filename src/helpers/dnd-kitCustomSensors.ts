import type { MouseEvent, KeyboardEvent } from 'react';
import { MouseSensor, KeyboardSensor } from '@dnd-kit/core';

export class CustomMouseSensor extends MouseSensor {
	static activators = [
		{
			eventName: 'onMouseDown' as const,
			handler: ({ nativeEvent: event }: MouseEvent) => {
				return shouldHandleEvent(event.target as HTMLElement);
			},
		},
	];
}

export class CustomKeyboardSensor extends KeyboardSensor {
	static activators = [
		{
			eventName: 'onKeyDown' as const,
			handler: ({ nativeEvent: event }: KeyboardEvent<Element>) => {
				return shouldHandleEvent(event.target as HTMLElement);
			},
		},
	];
}

function shouldHandleEvent(element: HTMLElement | null) {
	let current = element;

	if (current?.dataset && current.dataset.dnd) {
		return true;
	}

	return false;
}
