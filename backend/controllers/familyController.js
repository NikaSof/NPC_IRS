const ApiError = require('../error/ApiError')
const {FamilyMembers, User} = require('../models/models')
const jwt = require('jsonwebtoken')

class familyController {
    async add (req, res, next) {
        try{
            const {full_name, birth_date, relationship} = req.body
            const userId = req.user.id
            const family_member = await FamilyMembers.create({full_name, birth_date, relationship, userId: userId})
            return res.json(family_member)
        }catch (e) {
            return next(ApiError.internal('Произошла ошибка при получении данных пользователя'));
        }
    }
        
    async getByUser (req, res) {
        try {
            const userId = req.user.id
            let family_members;
    
            family_members = await FamilyMembers.findAndCountAll({ where: { userId: userId } });

           if (!family_members.rows.length) {
            return next(ApiError.badRequest('Члены семьи не найдены'));
        }
            return res.json(family_members);
        } catch (e) {
            return next(ApiError.internal('Произошла ошибка при получении данных пользователя'));
        }
    }
    async getAll (req, res, next) {
        try {
            let family_members = await FamilyMembers.findAndCountAll();

           if (!family_members.rows.length) {
            return next(ApiError.badRequest('Члены семьи не найдены'));
        }
            return res.json(family_members);
        } catch (e) {
            return next(ApiError.internal('Произошла ошибка при получении данных пользователя'));
        }
    }
}

module.exports = new familyController()