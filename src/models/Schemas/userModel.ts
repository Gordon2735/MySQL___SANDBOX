'use strict';

import { connection } from '../databases/mysqlDB.js';
import { Connection } from 'mysql2/promise';
import { RowDataPacket } from 'mysql2/promise';
import { executeMysqlQuery } from '../../bin/server.js';
import { uuid } from 'uuidv4';
import bcrypt from 'bcryptjs';

async function createUserTable(): Promise<void> {
	const conn: Connection = await connection();
	const query = `
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(255) PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `;
	await conn.query(query);
	conn.end();
}

async function insertUser(
	username: string,
	email: string,
	password: string
): Promise<void> {
	const conn: Connection = await connection();
	const id = uuid();
	const hashedPassword = await bcrypt.hash(password, 10);
	const query = `INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)`;
	await conn.query(query, [id, username, email, hashedPassword]);
	conn.end();
}

async function findUserByUsername(username: string): Promise<any> {
	const conn: Connection = await connection();
	const query = `SELECT * FROM users WHERE username = ?`;
	const [rows]: any = await conn.query(query, [username]);
	conn.end();

	return rows[0];
}

async function getRowsPacketUsers() {
	try {
		const user: RowDataPacket[] = await executeMysqlQuery(
			'SELECT * FROM user'
		);
		console.info(user);
		return;
	} catch (error: unknown) {
		console.error(`Error in getRowsPacketUsers: ${error}`);
		throw error as any as unknown;
	}
}

export {
	createUserTable as default,
	insertUser,
	findUserByUsername,
	getRowsPacketUsers
};
