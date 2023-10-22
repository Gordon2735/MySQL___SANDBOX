// import { Model } from 'sequelize';

// export default class Users extends Model {
// 	constructor(sequelize) {
// 		Model(sequelize);
// 		this.client = sequelize;
// 		this.model = sequelize.model;
// 	}

// 	async create(user) {
// 		return await this.model.user.create(user);
// 	}

// 	async findAll() {
// 		return await this.model.user.findAll();
// 	}

// 	async findById(id) {
// 		return await this.model.user.findByPk(id);
// 	}

// 	async update(id, user) {
// 		return await this.model.user.update(user, {
// 			where: {
// 				id
// 			}
// 		});
// 	}

// 	async delete(id) {
// 		return await this.model.user.destroy({
// 			where: {
// 				id
// 			}
// 		});
// 	}

// 	async findByEmail(email) {
// 		return await this.model.user.findOne({
// 			where: {
// 				email
// 			}
// 		});
// 	}

// 	async findByUsername(username) {
// 		return await this.model.user.findOne({
// 			where: {
// 				username
// 			}
// 		});
// 	}

// 	async findByEmailOrUsername(email, username) {
// 		return await this.model.user.findOne({
// 			where: {
// 				[this.client.Op.or]: [{ email }, { username }]
// 			}
// 		});
// 	}

// 	async findByEmailOrUsernameAndPassword(email, username, password) {
// 		return await this.model.user.findOne({
// 			where: {
// 				[this.client.Op.or]: [{ email }, { username }]
// 			}
// 		});
// 	}

// 	async findByEmailAndPassword(email, password) {
// 		return await this.model.user.findOne({
// 			where: {
// 				email
// 			}
// 		});
// 	}

// 	async findByEmailOrUsernameAndPasswordAndStatus(
// 		email,
// 		username,
// 		password,
// 		status
// 	) {
// 		return await this.model.user.findOne({
// 			where: {
// 				[this.client.Op.or]: [{ email }, { username }],
// 				status
// 			}
// 		});
// 	}

// 	async findByEmailAndPasswordAndStatus(email, password, status) {
// 		return await this.model.user.findOne({
// 			where: {
// 				email,
// 				status
// 			}
// 		});
// 	}

// 	async findByUsernameAndPasswordAndStatus(username, password, status) {
// 		return await this.model.user.findOne({
// 			where: {
// 				username,
// 				status
// 			}
// 		});
// 	}

// 	async findByEmailOrUsernameAndStatus(email, username, status) {
// 		return await this.model.user.findOne({
// 			where: {
// 				[this.client.Op.or]: [{ email }, { username }],
// 				status
// 			}
// 		});
// 	}

// 	async findByEmailAndStatus(email, status) {
// 		return await this.model.user.findOne({
// 			where: {
// 				email,
// 				status
// 			}
// 		});
// 	}

// 	async findByUsernameAndStatus(username, status) {
// 		return await this.model.user.findOne({
// 			where: {
// 				username,
// 				status
// 			}
// 		});
// 	}
// }
