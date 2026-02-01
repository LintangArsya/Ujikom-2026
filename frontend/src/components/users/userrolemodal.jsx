import { useState } from "react";
import { updateUserRole } from "../../service/userservice";

const UserRoleModal = ({ open, user, onClose, onSuccess }) => {
  const [role, setRole] = useState(user?.role || "");

  if (!open || !user) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateUserRole(user.id, role);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-semibold mb-4">
          Ubah Role: {user.name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            className="w-full border rounded p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Pilih Role</option>
            <option value="admin">Admin</option>
            <option value="direksi">Direksi</option>
            <option value="karyawan">Karyawan</option>
            <option value="teknisi">Teknisi</option>
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Batal
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRoleModal;