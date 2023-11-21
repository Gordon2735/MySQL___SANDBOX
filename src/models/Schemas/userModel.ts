'use strict';

import { connection } from '../databases/mysqlDB.js';
import { Connection } from 'mysql2/promise';
import { Session, SessionData } from 'express-session';
import { RowDataPacket } from 'mysql2/promise';
import { executeMysqlQuery } from '../../controllers/mysql_controllers/mysql_pool_rowData.js';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcryptjs';

async function createUserTable(): Promise<void> {
	try {
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

		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`Error in createUserTable: ${error}`);
		Promise.reject() as Promise<void>;
		throw error as any as unknown;
	}
}

async function createSessionsTable(): Promise<void> {
	try {
		const conn: Connection = await connection();
		const query = `
			CREATE TABLE IF NOT EXISTS sessions (
				session_id VARCHAR(255) NOT NULL COLLATE utf8mb4_0900_ai_ci,
				expires int(11) unsigned NOT NULL,
				user_id VARCHAR(255) COLLATE utf8mb4_0900_ai_ci,
				secretkey VARCHAR(255) DEFAULT 'NULL',
				userid VARCHAR(255) UNIQUE COLLATE utf8mb4_0900_ai_ci,
				data VARCHAR(255) COLLATE utf8mb4_0900_ai_ci,
				FOREIGN KEY (user_id) REFERENCES users(id),
				PRIMARY KEY (session_id)
				 
			)
		`;
		await conn.query(query);
		conn.end();

		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`Error in createSessionsTable: ${error}`);
		Promise.reject() as Promise<void>;
	}
}
// ALTER user_id SET DEFAULT 'not_logged_in_yet',
// user_id VARCHAR(255) SET DEFAULT 'wait_on_login',

async function insertSession(
	session_id: Session & Partial<SessionData>,
	user_id: string,
	secretkey: string,
	userid: string,
	data: SessionData
): Promise<void> {
	try {
		const conn: Connection = await connection();
		async function dropDefaultAdd(new_user_id: string) {
			return `ALTER TABLE sessions ALTER COLUMN user_id SET DEFAULT ${new_user_id} `;
		}
		async function defaultKey(new_secretkey: string) {
			return `ALTER TABLE sessions ALTER COLUMN secretkey DROP DEFAULT,
				ALTER TABLE sessions ALTER COLUMN secretkey SET DEFAULT ${new_secretkey} `;
		}
		const query = `INSERT INTO sessions (session_id, user_id, secretkey, userid, data) VALUES (?, ?, ?, ?, ?,)`;
		await conn.query(query, [
			session_id,
			dropDefaultAdd(user_id),
			defaultKey(secretkey),
			userid,
			data
		]);

		conn.end();
		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.info(
			`There was an Error in the insertSession method of the userModels; ERROR: ${error}`
		);
		Promise.reject() as Promise<void>;
	}
}

async function insertUser(
	username: string,
	email: string,
	password: string
): Promise<void> {
	try {
		const conn: Connection = await connection();
		const id = uuid();
		const hashedPassword = await bcrypt.hash(password, 10);
		const query = `INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)`;
		await conn.query(query, [id, username, email, hashedPassword]);
		conn.end();

		return Promise.resolve() as Promise<void>;
	} catch (error: unknown) {
		console.error(`Error in insertUser: ${error}`);
		Promise.reject() as Promise<void>;
		throw error as any as unknown;
	}
}

async function findUserByUsername(username: string): Promise<any> {
	try {
		const conn: Connection = await connection();
		const query = `SELECT * FROM users WHERE username = ?`;
		const [rows]: any = await conn.query(query, username);
		console.info(`rows: ${rows[0]}`);
		conn.end();

		Promise.resolve() as Promise<void>;
		return rows[0];
	} catch (error: unknown) {
		console.error(`Error in findUserByUsername: ${error}`);

		Promise.reject() as Promise<void>;
		throw error as any as unknown;
	}
}

async function getRowsPacketUsers(): Promise<RowDataPacket[]> {
	try {
		const query = `SELECT * FROM users`;
		const user: RowDataPacket[] = await executeMysqlQuery(query, [null]);
		console.info(user);

		Promise.resolve() as Promise<void>;
		return user;
	} catch (error: unknown) {
		console.error(`Error in getRowsPacketUsers: ${error}`);
		Promise.reject() as Promise<void>;
		throw error as any as unknown;
	}
}

export {
	createUserTable as default,
	createSessionsTable,
	insertSession,
	insertUser,
	findUserByUsername,
	getRowsPacketUsers
};
