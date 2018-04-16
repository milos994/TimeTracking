const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env]; //eslint-disable-line
const db = {};

if (config.use_env_variable) {
	let sequelize = new Sequelize(process.env[config.use_env_variable], config); //eslint-disable-line
} else {
	let sequelize = new Sequelize(config.database, config.username, config.password, config); // eslint-disable-line
}

fs
	.readdirSync(__dirname)
	.filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
	.forEach((file) => {
		const model = sequelize.import(path.join(__dirname, file)); // eslint-disable-line
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize; // eslint-disable-line
db.Sequelize = Sequelize;

module.exports = db;
