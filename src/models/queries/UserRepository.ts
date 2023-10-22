'use strict';
import IUser from '../../@types/interfaces/interfaces.js';
import { ResultSetHeader } from 'mysql2';
import { connection } from '../../bin/server.js';
import { Connection } from 'mysql2/promise';

export default class UserRepository {
	readAll(): Promise<IUser[]> {
		return new Promise(async (resolve, reject) => {
			const conn: Connection = await connection;
			conn.query<IUser[]>(
				'SELECT * FROM users',
				(error: unknown, res: any) => {
					if (error) reject(error);
					else resolve(res);
				}
			);
		});
	}

	readById(user_id: number): Promise<IUser | undefined> {
		return new Promise(async (resolve, reject) => {
			const conn: Connection = await connection;
			conn.query<IUser[]>(
				'SELECT * FROM users WHERE id = ?'[user_id],
				(error: unknown, res: any) => {
					if (error) {
						reject(error);
					} else {
						resolve(res?.[0]);
					}
				}
			);
		});
	}

	create(_user: IUser): Promise<IUser> {
		return new Promise(async (resolve, reject) => {
			const conn: Connection = await connection;
			conn.query<ResultSetHeader>(
				'INSERT INTO users (email, password, admin, avatar, role, status) VALUES (?, ?, ?, ?, ?, ?)',
				(error: unknown, res: any) => {
					if (error) reject(error);
					else
						this.readById(res.insertId)
							.then((_user) => resolve(_user!))
							.catch(reject);
				}
			);
		});
	}

	update(user: IUser): Promise<IUser | undefined> {
		return new Promise(async (resolve, reject) => {
			const conn: Connection = await connection;
			conn.query<ResultSetHeader>(
				`UPDATE users SET email = ?, password = ?, admin = ?, avatar = ?, role = ?, status = ? WHERE id = ?
                ${[
					user.email,
					user.password,
					user.admin,
					user.avatar,
					user.role,
					user.status,
					user.id
				]}`,
				(error: unknown, res: any) => {
					if (error) reject(error);
					else this.readById(user.id!).then(resolve).catch(reject);
				}
			);
		});
	}

	remove(user_id: number): Promise<number> {
		return new Promise(async (resolve, reject) => {
			const conn: Connection = await connection;
			conn.query<ResultSetHeader>(
				'DELETE FROM users WHERE id = ?'[user_id],
				(error: unknown, res: any) => {
					if (error) reject(error);
					else resolve(res.affectedRows);
				}
			);
		});
	}
}
