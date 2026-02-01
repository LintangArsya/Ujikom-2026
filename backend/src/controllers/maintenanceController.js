import {
  getAllMaintenanceService,
  getTechniciansService,
  createMaintenanceService,
  assignTechnicianService,
  completeMaintenanceService
} from "../services/maintenanceService.js";

export const getAllMaintenance = async (req, res) => {
  try {
    const data = await getAllMaintenanceService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const getTechnicians = async (req, res) => {
  try {
    const data = await getTechniciansService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// export const createMaintenance = async (req, res) => {
//   try {
//     const { asset_code, issue_description } = req.body;
//     const user_id = req.user.id;

//     const id = await createMaintenanceService(
//       asset_code,
//       user_id,
//       issue_description
//     );

//     res.status(201).json({
//       msg: "Maintenance request berhasil",
//       id
//     });
//   } catch (err) {
//     res.status(400).json({ msg: err.message });
//   }
// };

export const createMaintenance = async (req, res) => {
  try {
    const { asset_code, quantity, issue_description } = req.body;
    const user_id = req.user.id;

    if (!asset_code || !quantity || !issue_description) {
      return res.status(400).json({ msg: "Data tidak lengkap" });
    }

    const id = await createMaintenanceService(
      asset_code,
      user_id,
      quantity,
      issue_description
    );

    res.status(201).json({
      msg: "Maintenance request berhasil",
      id
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};


export const assignTechnician = async (req, res) => {
  try {
    const { technician_id } = req.body;
    await assignTechnicianService(req.params.id, technician_id);
    res.json({ msg: "Teknisi berhasil di-assign" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const completeMaintenance = async (req, res) => {
  try {
    const { result_condition } = req.body;

    if (!["baik", "rusak"].includes(result_condition)) {
      return res.status(400).json({ msg: "Result tidak valid" });
    }

    await completeMaintenanceService(req.params.id, result_condition);
    res.json({ msg: "Maintenance selesai" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
