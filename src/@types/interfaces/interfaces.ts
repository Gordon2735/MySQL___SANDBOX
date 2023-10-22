'use strict';

import { RowDataPacket } from 'mysql2';

export default interface IUser extends RowDataPacket {
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
