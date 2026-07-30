import { Routes, Route, Navigate } from "react-router-dom";
import { useUserContext } from "./context/UserProvider";
import BaseLayout from "./layouts/BaseLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/auth/Login";
import Unauthorized from "./pages/auth/Unauthorized";

import StudentDashboard from "./pages/student/Dashboard";
import Courses from "./pages/student/Courses";
import Assignments from "./pages/student/Assignments";
import StudentProfile from "./pages/student/Profile";

import TeacherDashboard from "./pages/teacher/Dashboard";
import Students from "./pages/teacher/Students";
import Grades from "./pages/teacher/Grades";
import TeacherProfile from "./pages/teacher/Profile";

import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Admins from "./pages/admin/Admins";
// Enrollments, Organizations, ChatbotAccess, StewardshipRenewal, Coupons,
// Questions land here as they're built. Not wired yet.

function HomeRedirect() {
    const { user } = useUserContext();
    if (!user)
        return <Navigate to="/login" replace />;

    return <Navigate to={`/${user.role}`} replace />;
}

export default function App() {

    return (

        <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route element={<BaseLayout />}>

                <Route element={<ProtectedRoute allowedRoles={["student"]} />}>

                    <Route path="/student" element={<StudentDashboard />} />
                    <Route path="/student/courses" element={<Courses />} />
                    <Route path="/student/assignments" element={<Assignments />} />
                    <Route path="/student/profile" element={<StudentProfile />} />

                </Route>

                <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>

                    <Route path="/teacher" element={<TeacherDashboard />} />
                    <Route path="/teacher/students" element={<Students />} />
                    <Route path="/teacher/grades" element={<Grades />} />
                    <Route path="/teacher/profile" element={<TeacherProfile />} />

                </Route>

                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>

                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/admins" element={<Admins />} />
                    
                </Route>
            </Route>
        </Routes>
    );
}