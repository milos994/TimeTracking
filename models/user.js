const Sequelize = require('sequelize');

module.exports = (sequelize) => {
	const User = sequelize.define('User', {
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	}, {});
	User.associate = function (models) { //eslint-disable-line
		// associations can be defined here
	};
	return User;
};
