'use strict';

import { RowDataPacket } from 'mysql2';

interface IUser extends RowDataPacket {
	id?: number;
	username: string;
	password: string;
	admin: boolean;
	email: string;
	avatar: string;
	role: number;
	status: number;
	createdAt: Date;
	updatedAt: Date;
}

interface PopoverElement extends HTMLElement {
	toggle?(): void;
}

interface ButtonElementWithPopover extends HTMLButtonElement {
	popoverContent?: PopoverElement;
}

interface SessionData {
	user: any;
}

export {
	IUser as default,
	PopoverElement,
	ButtonElementWithPopover,
	SessionData
};
