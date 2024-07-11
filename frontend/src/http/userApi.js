import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";
import axios from 'axios';

export const registration = async (login, password, email, full_name, birth_date) => {
        const {data} = await $host.post('api/user/registration', {login, password, email, full_name, birth_date, role: 'user'})
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
}

export const login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const user_token = localStorage.token
    const {data} = await $host.get('api/user/auth', {headers:{"Authorization": `Bearer ${user_token}`}} )
    return data.id
}
