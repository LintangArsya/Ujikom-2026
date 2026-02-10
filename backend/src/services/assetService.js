import db from "../config/db.js"

export const createAssetService = async (data) => {
    const {asset_code,
        asset_name,
        category,
        quantity,
        maintenance_quantity,
        available_quantity,
        asset_status,
        condition_status,
        acquisition_price,
        current_value,
        installment_value,
        installment_tenor,
        installment_remaining,
        purchase_date
    } = data;

    if (asset_status === "liabilitas") {
        if(
            installment_value == null ||
            installment_tenor == null ||
            installment_remaining == null
        ){
            throw new Error(
                "Data cicilan wajib diisi untuk asset liabilitas"
            );
        }
    }

    if (asset_status === "asset") {
        if (
            installment_value != null ||
            installment_tenor != null ||
            installment_remaining != null
        ) {
            throw new Error(
                "Asset tidak boleh memiliki data cicilan"
            )
        }
    }

    const [result] = await db.query(
        `INSERT INTO assets (
            asset_code, asset_name, category, quantity, maintenance_quantity, available_quantity,
            asset_status, condition_status,
            acquisition_price, current_value,
            installment_value, installment_tenor, installment_remaining,
            purchase_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            asset_code, asset_name, category, quantity, maintenance_quantity,available_quantity, asset_status, condition_status, acquisition_price, current_value, installment_value, installment_tenor, installment_remaining, purchase_date
        ]
    );

    return result.insertId
}

export const getAllAssetService = async (role) => {
  if (role === "admin" || role === "direksi") {
    const [rows] = await db.query(
      "SELECT * FROM assets ORDER BY id ASC"
    );
    return rows;
  }

  const [rows] = await db.query(`
    SELECT
      id,
      asset_code,
      asset_name,
      category,
      quantity,
      maintenance_quantity,
      available_quantity,
      asset_status,
      condition_status,
      purchase_date
    FROM assets
    ORDER BY id ASC
  `);

  return rows;
};

export const getAssetByIdService = async (id, role) => {
  let query;

  if (role === "admin" || role === "direksi") {
    query = "SELECT * FROM assets WHERE id = ?";
  } else {
    query = `
      SELECT
        id,
        asset_code,
        asset_name,
        category,
        quantity,
        maintenance_quantity,
        available_quantity,
        asset_status,
        condition_status,
        purchase_date
      FROM assets
      WHERE id = ?
    `;
  }

  const [rows] = await db.query(query, [id]);
  return rows[0];
};

export const getAssetByCodeService = async (asset_code, role) => {
  let query;

  if (role === "admin" || role === "direksi") {
    query = "SELECT * FROM assets WHERE asset_code = ?";
  } else {
    query = `
      SELECT
        id,
        asset_code,
        asset_name,
        category,
        quantity,
        maintenance_quantity,
        available_quantity,
        asset_status,
        condition_status,
        purchase_date
      FROM assets
      WHERE asset_code = ?
    `;
  }

  const [rows] = await db.query(query, [asset_code]);
  return rows[0];
};

export const updateAssetService = async (id, data) => {
    const [result] = await db.query(
        "UPDATE assets SET ? WHERE id = ?",
        [data, id]
    );
    return result.affectedRows
};

export const deleteAssetService = async (id) => {
    const [result] = await db.query(
        "DELETE FROM assets WHERE id = ?",
        [id]
    );
    return result.affectedRows
}