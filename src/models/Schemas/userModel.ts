'use strict';

import { connection } from '../databases/mysqlDB.js';
import { Connection } from 'mysql2/promise';
import { RowDataPacket } from 'mysql2/promise';
import { executeMysqlQuery } from '../../bin/server.js';
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
	insertUser,
	findUserByUsername,
	getRowsPacketUsers
};
