import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login-page.style.css';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button/Button';
import { DotSpinner } from '@uiball/loaders';
import AuthService from '../../../data/services/auth.service';
import { useDispatch } from 'react-redux';
import { UserRole } from '../../../../../core/entities/user.entity';
import { assignCurrentUser } from '../../../../../core/redux/current-user.slice';

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogging, setIsLogging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const authService = AuthService.getInstance();
  const dispatch = useDispatch();
  

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLogging(true);
    const loginSuccess = await authService.login(identifier, password);

    if (loginSuccess) {
      const user = await authService.getMe();
      if (user) {
        const authorizedRoles = [UserRole.admin, UserRole.supervisor, UserRole.operator];
        if (authorizedRoles.includes(user.role!)) {
          dispatch(assignCurrentUser(user));
          localStorage.setItem('UserRole', user.role === UserRole.admin ? 'admin' : user.role === UserRole.supervisor ? 'supervisor' : 'operator');
          navigate('/home');
        } else {
          localStorage.clear();
          setSnackbarMessage("vous n'êtes pas autorisé");
          setShowSnackbar(true);
        }
      }
      setIsLogging(false);
    } else {
      setIsLogging(false);
      setSnackbarMessage('Échec de la connexion');
      setShowSnackbar(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleCloseSnackbar = () => setShowSnackbar(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  };

  const handleAutoLogin = async () => {
    if (localStorage.getItem('isLogged') === 'true' && localStorage.getItem('token')) {
      const currentUser = await authService.getMe();
      if (currentUser && !currentUser.isBlocked) {
        dispatch(assignCurrentUser(currentUser));
        localStorage.setItem('UserRole', currentUser.role === UserRole.admin ? 'admin' : currentUser.role === UserRole.supervisor ? 'supervisor' : 'operator');
        navigate('/home');
      } else {
        localStorage.clear();
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return isLoading ? (
    <div style={{
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
    </div>
  ) : (
    <div className='login-container'>
      <div className='login-border'>
        <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>Se connecter</h2>
        <TextField
          label="Nom d'utilisateur ou email"
          onChange={(event) => setIdentifier(event.target.value)}
          onKeyDown={handleKeyDown}
          maxRows={1}
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus={true}
            role={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Mot de passe"
          />
        </FormControl>
        <Button
          variant="outlined"
          onClick={handleLogin}
          style={{
            backgroundColor: 'teal',
            color: 'white'
          }}
        >
          Connecter
        </Button>
      </div>
      <div style={{
        width: '80px',
        overflow: 'hidden',
        height: isLogging ? '100px' : '0px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 300ms ease'
      }}>
        <DotSpinner
          size={40}
          speed={0.9}
          color="black"
        />
        <p>connecter...</p>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={showSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
        message={snackbarMessage}
      />
    </div>
  );
}

export default LoginPage;
