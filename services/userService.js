import { successResponse, errorResponse } from "../utils/response.js";
import { nanoid } from "nanoid";
import pool from "../userService.js";

const users = [];

export const addUser = async (req, res, next) => {
    let id = nanoid(6);
    let name = req.body.name;
    let email= req.body.email;
    let password = req.body.password;

    try {
        const [result] = await pool.query(
            "INSERT INTO users (user_id, name, email, password) VALUES (?, ?, ?, ?)",
            [id, name, email, password]
        );

        if (result.affectedRows > 0) {
            successResponse(res, "berhasil menambahkan user", { id, name, email, password });
        } else {
            errorResponse(res, "gagal menambahkan user", 500);
        }
    } catch (error) {
        console.error(error);
        errorResponse(res, "gagal menambahkan user", 500);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");

        successResponse(res, "success", rows);
    } catch (error) {
        console.error(error);
        errorResponse(res, "gagal mendapatkan data user", 500);
    }
}

export const updateUser = async (req, res, next) => {
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    
    try {
        const [result] = await pool.query(
            "UPDATE users SET name = ?, email = ?, password = ? WHERE user_id = ?",
            [name, email, password, id]
        );

        if (result.affectedRows > 0) {
            successResponse(res, "berhasil update user", { id, name, email, password });
        } else {
            errorResponse(res, "user tidak ditemukan");
        }
    } catch (error) {
        console.error(error);
        errorResponse(res, "gagal mengupdate user", 500);
    }
}

export const deleteUser = async (req, res, next) => {
    let id = req.params.id;
    
    try {
        const [result] = await pool.query("DELETE FROM users WHERE user_id = ?", [id]);

        if (result.affectedRows > 0) {
            successResponse(res, "berhasil hapus user", { id });
        } else {
            errorResponse(res, "user tidak ditemukan");
        }
    } catch (error) {
        console.error(error);
        errorResponse(res, "gagal menghapus user", 500);
    }
}