import db from "../config/db.js";

export const getAllMaintenanceService = async () => {
  const [rows] = await db.query(`
    SELECT
      mr.id,
      a.asset_code,
      a.asset_name,
      mr.quantity,
      mr.issue_description,
      mr.status,
      mr.result_condition,
      u1.name AS requested_by,
      u2.name AS assigned_to,
      mr.request_date,
      mr.completion_date
    FROM maintenance_requests mr
    JOIN assets a ON mr.asset_id = a.id
    JOIN users u1 ON mr.requested_by = u1.id
    LEFT JOIN users u2 ON mr.assigned_to = u2.id
    ORDER BY mr.id DESC
  `);

  return rows;
};

export const getTechniciansService = async () => {
  const [rows] = await db.query(
    "SELECT id, name FROM users WHERE role = 'teknisi'"
  );
  return rows;
};

export const createMaintenanceService = async (
  asset_code,
  user_id,
  request_quantity,
  issue
) => {
  const [rows] = await db.query(
    `SELECT 
       id,
       quantity,
       maintenance_quantity,
       available_quantity
     FROM assets
     WHERE asset_code = ?`,
    [asset_code]
  );

  if (rows.length === 0) {
    throw new Error("Asset tidak ditemukan");
  }

  const asset = rows[0];

  if (request_quantity <= 0) {
    throw new Error("Quantity harus lebih dari 0");
  }

  if (request_quantity > asset.available_quantity) {
    throw new Error("Quantity melebihi stok tersedia");
  }

  const asset_id = asset.id;

  const [result] = await db.query(
    `INSERT INTO maintenance_requests
     (asset_id, requested_by, quantity, issue_description)
     VALUES (?, ?, ?, ?)`,
    [asset_id, user_id, request_quantity, issue]
  );

  await db.query(
    `UPDATE assets
     SET
       maintenance_quantity = maintenance_quantity + ?,
       available_quantity = available_quantity - ?,
       condition_status = 'maintenance'
     WHERE id = ?`,
    [request_quantity, request_quantity, asset_id]
  );

  return result.insertId;
};

export const assignTechnicianService = async (id, technician_id) => {
  await db.query(
    `UPDATE maintenance_requests
     SET assigned_to = ?, status = 'in_progress'
     WHERE id = ?`,
    [technician_id, id]
  );
};


export const completeMaintenanceService = async (
  request_id,
  result_condition
) => {
  const [rows] = await db.query(`
    SELECT
      mr.asset_id,
      mr.quantity,
      a.quantity AS asset_quantity,
      a.maintenance_quantity,
      a.available_quantity
    FROM maintenance_requests mr
    JOIN assets a ON mr.asset_id = a.id
    WHERE mr.id = ?
  `, [request_id]);

  if (rows.length === 0) {
    throw new Error("Maintenance request tidak ditemukan");
  }

  const data = rows[0];

  if (result_condition === "baik") {
    await db.query(
      `UPDATE assets
       SET
         maintenance_quantity = maintenance_quantity - ?,
         available_quantity = available_quantity + ?
       WHERE id = ?`,
      [data.quantity, data.quantity, data.asset_id]
    );
  }

  if (result_condition === "rusak") {
    await db.query(
      `UPDATE assets
       SET
         quantity = quantity - ?,
         maintenance_quantity = maintenance_quantity - ?,
         available_quantity = available_quantity - ?
       WHERE id = ?`,
      [data.quantity, data.quantity, data.quantity, data.asset_id]
    );
  }

  await db.query(
    `UPDATE maintenance_requests
     SET
       status = 'completed',
       result_condition = ?,
       completion_date = NOW()
     WHERE id = ?`,
    [result_condition, request_id]
  );
};