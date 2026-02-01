import { useEffect, useState, useCallback } from "react";
import { getAllUsers, deleteUser } from "../../service/userservice";
import UserCard from "../../components/users/usercard";
import UserRoleModal from "../../components/users/userrolemodal";
import { useAuth } from "../../auth/useAuth";

const UserPages = () => {
  const { user, loading } = useAuth();

  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Gagal fetch users", err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) fetchUsers();
  }, [loading, fetchUsers]);

  const handleDelete = async (id) => {
    if (user.role !== "admin") return;

    if (!confirm("Yakin hapus user ini?")) return;

    await deleteUser(id);
    fetchUsers();
  };

  if (loading || loadingData) {
    return <div className="p-6">Loading users...</div>;
  }

  if (!["admin", "direksi"].includes(user.role)) {
    return (
      <div className="p-6 text-red-500 font-semibold">
        Anda tidak memiliki akses ke halaman ini
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      <div className="grid md:grid-cols-3 gap-4">
        {users.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            role={user.role}
            onEdit={user.role === "admin" ? setSelected : null}
            onDelete={user.role === "admin" ? handleDelete : null}
          />
        ))}
      </div>

      {user.role === "admin" && (
        <UserRoleModal
          open={!!selected}
          user={selected}
          onClose={() => setSelected(null)}
          onSuccess={fetchUsers}
        />
      )}
    </div>
  );
};

export default UserPages;