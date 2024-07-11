const ApiError = require('../error/ApiError')
const {Education} = require('../models/models')
const jwt = require('jsonwebtoken')

class educationController {
    async add (req, res, next) {
        try{
            const {institution, degree, start_date, end_date} = req.body
            const userId = req.user.id

            if (!institution || !degree || !start_date || !end_date){
                return next(ApiError.badRequest('Вы указали не все данные'))
            }
            
            const object = await Education.create({institution, degree, start_date, end_date, userId: userId})
            return res.json(object)
        }catch (e) {
        return next(ApiError.internal('Произошла ошибка при получении данных пользователя'));
        }
    }
    async getByUser (req, res, next) {
        try {
            const userId = req.user.id
            const education = await Education.findAndCountAll({ where: { userId: userId } });

           if (!education.rows.length) {
            return next(ApiError.badRequest('Образование не добавлено'));
        }
            return res.json(education);
        } catch (e) {
            return next(ApiError.internal('Произошла ошибка при получении данных об образовании'));
        }
    }

    async getAll (req, res, next) {
        try {
            const education = await Education.findAndCountAll();

           if (!education.rows.length) {
            return next(ApiError.badRequest('Образование не добавлено'));
        }
            return res.json(education);
        } catch (e) {
            return next(ApiError.internal('Произошла ошибка при получении данных об образовании'));
        }
    }
}

module.exports = new educationController()