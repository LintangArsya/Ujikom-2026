import { registerService, loginService, updateUserRoleService, getAllUsersService, getUserByIdService, deleteUserService } from "../services/authService.js";

export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        if (!name || !email || !password){
            return res.status(400).json({
                msg: "Data tidak lengkap"
            });
        }

        const user = await registerService({name, email, password});

        res.status(201).json({
            msg: "Register berhasil",
            data: user
        })
    }catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

export const login = async (req, res) => {
    try{
        const result = await loginService(req.body);
        res.json(result);
    }catch (err) {
        res.status(401).json({
            msg: 'Gagal login'
        })
    }
}

export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const updated = await updateUserRoleService(userId, role);

    if (updated === 0) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    res.json({ msg: "Role user berhasil diubah" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getAllUsers = async (req, res) => {
    try {
        const user = await getAllUsersService()
        res.json(user)
    }catch (err){
        res.status(500).json({
            msg : "Gagal mengambil data user"
        })
    }
}

export const getUserById = async (req, res) => {
    try{
        const user = await getUserByIdService(req.params.id)

        if(!user) {
            return res.status(404).json({
                msg : "user tidak ditemukan"
            });
        }

        res.json(user)
    }catch (err) {
        res.status(500).json({
            msg : "Gagal mengambil detail user"
        })
    }
}

export const deleteUser = async (req, res) => {
  try {
    const deleted = await deleteUserService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    res.json({ msg: "User berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ msg: "Gagal hapus user" });
  }
};