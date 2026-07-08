import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Exercises from './pages/Exercises';
import ExerciseDetail from './pages/ExerciseDetail';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Workout from './pages/Workout';
import WorkoutSession from './pages/WorkoutSession';
import Sessions from './pages/Sessions';
import SessionDetail from './pages/SessionDetail';
import Profile from './pages/Profile';
import Users from './pages/Users';
import TrainerClients from './pages/TrainerClients';
import TrainerClientDetail from './pages/TrainerClientDetail';
import NotFound from './pages/NotFound';

const AppLayout = () => (
  <div className="min-vh-100">
    <NavBar />
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registrati" element={<Register />} />
      <Route path="/password-dimenticata" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/esercizi" element={<Exercises />} />
        <Route path="/esercizi/:id" element={<ExerciseDetail />} />
        <Route path="/schede" element={<Programs />} />
        <Route path="/schede/:id" element={<ProgramDetail />} />
        <Route path="/allenamento" element={<Workout />} />
        <Route path="/allenamento/:sessionId" element={<WorkoutSession />} />
        <Route path="/sessioni" element={<Sessions />} />
        <Route path="/sessioni/:id" element={<SessionDetail />} />
        <Route path="/profilo" element={<Profile />} />
        <Route path="/iscritti" element={<Users />} />
        <Route path="/clienti" element={<TrainerClients />} />
        <Route path="/clienti/:clientId" element={<TrainerClientDetail />} />
      </Route>

      <Route path="/logout" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
