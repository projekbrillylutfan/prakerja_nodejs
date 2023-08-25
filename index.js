/*
    1. Ubah API CRUD berikut menggunakan Database.
*/

import express from 'express';
import mysql from 'mysql2/promise';
import * as UserService from './services/userService.js';

const app = express();
const port = 8080;
const host = "localhost";
app.use(express.json())

const dbConfig = {
    host: 'localhost',
    user: '', 
    password: '',
    database: 'batch8_prakerja'
};

const pool = mysql.createPool(dbConfig);

export default pool;

app.get('/users', UserService.getUser);
app.post('/users', UserService.addUser);
app.put('/users/:id', UserService.updateUser);
app.delete('/users/:id', UserService.deleteUser);

app.listen(port, host, () => {
    console.log(`server berjalan pada http://${host}:${port}`);
})
