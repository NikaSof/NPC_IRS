const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique:true},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique:true},
    full_name: {type: DataTypes.STRING},
    birth_date: {type: DataTypes.DATE},
    role: {type: DataTypes.STRING, defaultValue: 'user'},
});

const FamilyMembers = sequelize.define('family_members', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    full_name: {type: DataTypes.STRING},
    birth_date: {type: DataTypes.DATE},
    relationship: {type: DataTypes.STRING}
});

const Education = sequelize.define('education', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    institution: {type: DataTypes.STRING},
    degree: {type: DataTypes.STRING},
    start_date: {type: DataTypes.DATE},
    end_date: {type: DataTypes.DATE},
});

User.hasMany(FamilyMembers)
FamilyMembers.belongsTo(User)

User.hasMany(Education)
Education.belongsTo(User)

module.exports = {
    User,
    FamilyMembers, 
    Education
}