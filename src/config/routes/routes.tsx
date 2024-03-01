import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../core/components/sidebar/sidebar.component';
import LoginPage from '../../features/login/presentation/pages/login-page/login-page.component';
import ProfilePage from '../../features/profile/presentation/pages/profile-page/profile-page.component';
import AuthService from '../../features/login/data/services/auth.service';
import UserEntity, { UserRole } from '../../core/entities/user.entity';
import HomePage from '../../features/home/presentation/pages/home-page/home-page.component';
import CommandPage from '../../features/command/presentation/pages/command-page/command-page.component';
import ReportPage from '../../features/report/presentation/pages/report-page/report-page.component';
import PlanPage from '../../features/plan/presentation/pages/plan-page/plan-page.component';

const AppRouter: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserEntity>(new UserEntity());
  const location = useLocation();
  const navigate = useNavigate();
  const authService = AuthService.getInstance();

  const handleAutoAssign = async () => {
    if (!currentUser._id) {
      if (localStorage.getItem('isLogged') === 'true' && localStorage.getItem('token')) {
        const user = await authService.getMe();
        if (user && !user.isBlocked) {
          setCurrentUser(user);
          localStorage.setItem('UserType', user.role === UserRole.admin ? 'admin' : user.role === UserRole.supervisor ? 'supervisor' : 'operator');
        } else {
          localStorage.clear();
          navigate('/');
        }
      }
      else {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    handleAutoAssign();
  }, [currentUser._id]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {
        location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/content' ? (
          <div style={{ width: '100%', height: '100vh', margin: '0px', padding: '0px' }}>
            <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
              <Sidebar />
              <div style={{ flexGrow: '1', width: '100%', overflow: 'auto', height: '100%' }}>
                <Routes>
                  <Route path="/profile" element={<ProfilePage currentUser={currentUser} />} />
                  <Route path="/home" element={<HomePage currentUser={currentUser} />} />
                  <Route path="/command" element={<CommandPage currentUser={currentUser} />} />
                  <Route path="/report" element={<ReportPage currentUser={currentUser} />} />
                  <Route path="/plan" element={<PlanPage currentUser={currentUser} />} />
                </Routes>
              </div>
            </div>
          </div>) : null
      }
    </div>
  );
};

export default AppRouter;
