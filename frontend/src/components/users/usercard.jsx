const UserCard = ({ user, role, onEdit, onDelete }) => {
  if (!user) return null;

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="font-semibold text-lg">{user.name}</h3>

      <p className="text-sm text-gray-600">Email: {user.email}</p>
      <p className="text-sm text-gray-600 capitalize">
        Role: {user.role}
      </p>

      <div className="flex gap-2 mt-4">
        {role === "admin" && (
          <>
            <button
              onClick={() => onEdit(user)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              Edit Role
            </button>

            <button
              onClick={() => onDelete(user.id)}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;
