const uuid = require('uuid')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const {User} = require('../models/models')

const generateJwt = (id, login, password, role) => {
    return jwt.sign(
        {id, login, password, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration (req, res, next) {
        try{
            const {login, password, email, full_name, birth_date, role} = req.body
            if (!email || !login || !password) {
                return next(ApiError.badRequest('Некорректный email, login или password'))
            }
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({
                login, 
                password: hashPassword, 
                email, 
                full_name, 
                birth_date, 
                role
            })
            const token = generateJwt(user.id, user.login, user.password, user.role)
            return res.json({ message: 'Registration successful', user, token })
        }catch (e) {
            return next(ApiError.internal('Произошла ошибка при регистрации'));
        }
    }

    async login (req, res, next) {
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.password, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        
        try {
            const { id } = req.user;

            const user = await User.findOne({ where: { id } });
            if (!user) {
                return next(ApiError.badRequest('Пользователь не найден'));
            }

            return res.json({
                id: user.id,
                login: user.login,
                email: user.email,
                full_name: user.full_name,
                birth_date: user.birth_date
            });
        } catch (e) {
            return next(ApiError.internal('Произошла ошибка при получении данных пользователя'));
        }
    }

    async getAll(req, res, next){
        try {
            let { id } = req.query;
            let users;
    
            if (id) {
                users = await User.findAndCountAll({ where: { id } });
            } else {
                users = await User.findAndCountAll();
            }
    
            if (!users.rows.length) {
                return next(ApiError.badRequest('Пользователей не найдено'));
            }
    
            return res.json(users);
        } catch (e) {
            return next(ApiError.internal('Произошла ошибка при получении данных пользователя'));
        }
    }
}

module.exports = new UserController()