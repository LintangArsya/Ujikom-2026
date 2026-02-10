import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const summary = {
    totalAssets: 111,
    totalUsers: 124,
    maintenanceRequests: 23,
    asset: 87,
    liabilities: 24,
  };

  const barData = {
    labels: ["Elektronik", "Kendaraan", "Furniture", "Lainnya"],
    datasets: [
      {
        label: "Jumlah Asset",
        data: [10, 5, 6, 3],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const pieData = {
    labels: ["Asset", "Liability"],
    datasets: [
      {
        data: [87, 24],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total Asset</p>
          <p className="text-2xl font-bold">{summary.totalAssets}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total User</p>
          <p className="text-2xl font-bold">{summary.totalUsers}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Maintenance History</p>
          <p className="text-2xl font-bold">
            {summary.maintenanceRequests}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Asset</p>
          <p className="text-2xl font-bold">
            {summary.asset}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Liability</p>
          <p className="text-2xl font-bold">
            {summary.liabilities}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Asset per Kategori
          </h2>
          <Bar data={barData} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold mb-4">
            Asset vs Liability
          </h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
