import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const registerService = async ({ name, email, password }) => {
    const [check] = await db.query(
        "SELECT id FROM users WHERE email = ?",
        [email]
    );

    if (check.length > 0 ){
        throw new Error("Email sudah terdaftar")
    };

    const role = "karyawan"

    const [result] = await db.query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [name, email, password, role]
    );

    return{
        id: result.insertId,
        name,
        email,
        role
    };
};

export const loginService = async ({ email, password}) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if (rows.length === 0){
        throw new Error("Email tidak ditemukan");
    }

    const user = rows[0];

    if (password !== user.password) {
        throw new Error("Password salah")
    }

    const token = jwt.sign(
        { 
            id: user.id, 
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d"}
    );

    return{
        token,
        role: user.role,
        name: user.name
    };
}


export const updateUserRoleService = async (userId, role) => {
  const allowedRoles = ["admin", "karyawan", "teknisi", "direksi"];

  if (!allowedRoles.includes(role)) {
    throw new Error("Role tidak valid");
  }

  const [result] = await db.query(
    "UPDATE users SET role = ? WHERE id = ?",
    [role, userId]
  );

  return result.affectedRows;
};

export const getAllUsersService = async () => {
    const [rows] = await db.query(
        "SELECT * FROM users"
    )
    return rows
}

export const getUserByIdService = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM users WHERE id =?",
        [id]
    )
    if (rows.length === 0) {
        return res.status(404).json({
            msg : "Data tidak ditemukan"
        })
    }
    return rows[0]
}

export const deleteUserService = async (id) => {
  const [result] = await db.query(
    "DELETE FROM users WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};