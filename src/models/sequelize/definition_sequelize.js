import { DataTypes } from 'sequelize';

export default function (sequelize) {
	const User = sequelize.define(
		'user',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			email: DataTypes.STRING,
			avatar: DataTypes.STRING,
			role: DataTypes.INTEGER,
			status: DataTypes.INTEGER,
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		},
		{
			freezeTableName: true,
			timestamps: true,
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	);
	sequelize.sync();
}
