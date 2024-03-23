import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../core/components/sidebar/sidebar.component';
import LoginPage from '../../features/login/presentation/pages/login-page/login-page.component';
import ProfilePage from '../../features/profile/presentation/pages/profile-page/profile-page.component';
import AuthService from '../../features/login/data/services/auth.service';
import HomePage from '../../features/home/presentation/pages/home-page/home-page.component';
import CommandPage from '../../features/command/presentation/pages/command-page/command-page.component';
import ReportPage from '../../features/report/presentation/pages/report-page/report-page.component';
import PlanPage from '../../features/plan/presentation/pages/plan-page/plan-page.component';
import UserPage from '../../features/user/presentation/pages/user-page/user-page.component';
import RevenuePage from '../../features/revenue/presentation/pages/revenue-page/revenue-page.component';
import ExpensePage from '../../features/expense/presentation/pages/expense-page/expense-page.component';
import TaskPage from '../../features/task/presentation/pages/task-page/task-page.component';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../core/redux/store';
import { assignCurrentUser } from '../../core/redux/current-user.slice';
import DotSpinner from '@uiball/loaders/dist/components/DotSpinner';
import ClientPage from '../../features/client/presentation/pages/clients-page/clients-page.component';
import StatisticsPage from '../../features/statistics/presentation/pages/statistics-page/statistics-page.component';

const AppRouter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authService = AuthService.getInstance();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.counter.currentUser); // Assuming your currentUser reducer is under the key 'currentUser' in your rootReducer

  const handleAutoAssign = async () => {
    if (!currentUser._id) {
      if (localStorage.getItem('isLogged') === 'true' && localStorage.getItem('token')) {
        const user = await authService.getMe();
        if (user && !user.isBlocked) {
          dispatch(assignCurrentUser(user));
          localStorage.setItem('UserRole', user.role!);
        } else {
          localStorage.clear();
          navigate('/');
        }
      } else {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    handleAutoAssign();
  }, []);

  if (localStorage.getItem('isLogged') === 'true' &&  !currentUser._id) {
    return <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
  }}>
      <DotSpinner
          size={40}
          speed={0.9}
          color="black"
      />
  </div>;
  }

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
                  <Route path="/user" element={<UserPage currentUser={currentUser} />} />
                  <Route path="/revenue" element={<RevenuePage currentUser={currentUser} />} />
                  <Route path="/expense" element={<ExpensePage currentUser={currentUser} />} />
                  <Route path="/task" element={<TaskPage currentUser={currentUser} />} />
                  <Route path="/client" element={<ClientPage currentUser={currentUser} />} />
                  <Route path="/statistics" element={<StatisticsPage currentUser={currentUser} />} />
                </Routes>
              </div>
            </div>
          </div>) : null
      }
    </div>
  );
};

export default AppRouter;
