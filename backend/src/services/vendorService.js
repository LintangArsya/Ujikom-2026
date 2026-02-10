import db from "../config/db.js";

export const createVendorsService = async(id, vendor_name, email, phone, address) => {
    const [result] = await db.query(
        `INSERT INTO vendors (
            id, vendor_name, email, phone, address
        ) VALUES (?, ?, ?, ?, ?)`,
         [id, vendor_name, email, phone, address]
    );

    return{
        id: result.insertId,
        vendor_name,
        email,
        phone,
        address
    }
}

export const getAllVendorsService = async() => {
    const [rows] = await db.query(`
        SELECT * FROM vendors ORDER BY id ASC
        `);
    return rows;
}

export const getVendorsByIDService = async(id) => {
    let query
    query = (`SELECT * FROM vendors WHERE id = ? `)

    const [rows] = await db.query(query, [id]);
    return rows;
}

export const updateVendorsService = async(id, data) => {
    const [result] = await db.query(
        "UPDATE vendors SET ? WHERE id = ?",
        [data, id]
    );
    return result.affectedRows
}

export const deleteVendorsService = async (id) => {
    const [result] = await db.query(
        "DELETE FROM vendors WHERE id = ?",
        [id]
    );
    return result.affectedRows
}