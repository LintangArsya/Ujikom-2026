import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../auth/protectedRoute.jsx";
//Login & Register
import Login from "../pages/auth/login.jsx";
import Register from "../pages/auth/register.jsx";
//Dashboard
import KaryawanDashboard from "../pages/dashboard/karyawandashboard.jsx";
import AdminDashboard from "../pages/dashboard/admindashboard.jsx";
import DireksiDashboard from "../pages/dashboard/direksidashboard.jsx";
import TeknisiDashboard from "../pages/dashboard/teknisidashboard.jsx";
import DashboardLayout from "../components/layout/dashboardlayout.jsx";
//Users
import UserLayout from "../components/layout/userlayout.jsx";
import UserPages from "../pages/users/userpages.jsx";
//assets
import AssetLayout from "../components/layout/assetlayout.jsx";
import AssetPage from "../pages/assets/assetpages.jsx";
//MaintenanceRequest
import MaintenanceRequestLayout from "../components/layout/maintenancerequestlayout.jsx";
import AdminMaintenanceRequest from "../pages/maintenance_request/adminmaintenance_request.jsx";
import DireksiMaintenanceRequest from "../pages/maintenance_request/direksimaintenance_request.jsx";
import KaryawanMaintenanceRequest from "../pages/maintenance_request/karyawanmaintenance_request.jsx";
import TeknisiMaintenanceRequest from "../pages/maintenance_request/teknisimaintenance_request.jsx";


const AppRouter = () => {
  return (
    <Routes>
      {/* DEFAULT */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DASHBOARD */}
      <Route 
        path="/dashboard/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <DashboardLayout>
                <AdminDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/dashboard/direksi"
        element={
          <ProtectedRoute roles={["direksi"]}>
            <DashboardLayout>
                <DireksiDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/karyawan"
        element={
          <ProtectedRoute roles={["karyawan"]}>
            <DashboardLayout>
                <KaryawanDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/dashboard/teknisi"
        element={
          <ProtectedRoute roles={["teknisi"]}>
            <DashboardLayout>
                <TeknisiDashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* users */}
      <Route
        path="/dashboard/users"
        element={
          <ProtectedRoute roles={["admin", "direksi"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserPages />} />
      </Route>

      {/* Asset */}
      <Route 
        path="/dashboard/admin/assets"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AssetLayout>
              <AssetPage/>
            </AssetLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/dashboard/direksi/assets"
        element={
          <ProtectedRoute roles={["direksi"]}>
            <AssetLayout>
              <AssetPage/>
            </AssetLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/dashboard/karyawan/assets"
        element={
          <ProtectedRoute roles={["karyawan"]}>
            <AssetLayout>
              <AssetPage/>
            </AssetLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/dashboard/teknisi/assets"
        element={
          <ProtectedRoute roles={["teknisi"]}>
            <AssetLayout>
              <AssetPage/>
            </AssetLayout>
          </ProtectedRoute>
        }
      />

      {/* Maintenance Request */}
      <Route 
        path="/dashboard/admin/maintenance"
        element={
          <ProtectedRoute roles={["admin"]}>
            <MaintenanceRequestLayout>
              <AdminMaintenanceRequest/>
            </MaintenanceRequestLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/dashboard/direksi/maintenance"
        element={
          <ProtectedRoute roles={["direksi"]}>
            <MaintenanceRequestLayout>
              <DireksiMaintenanceRequest/>
            </MaintenanceRequestLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/dashboard/karyawan/maintenance"
        element={
          <ProtectedRoute roles={["karyawan"]}>
            <MaintenanceRequestLayout>
              <KaryawanMaintenanceRequest/>
            </MaintenanceRequestLayout>
          </ProtectedRoute>
        }
      />

      <Route 
        path="/dashboard/teknisi/maintenance"
        element={
          <ProtectedRoute roles={["teknisi"]}>
            <MaintenanceRequestLayout>
              <TeknisiMaintenanceRequest/>
            </MaintenanceRequestLayout>
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
