import AppRouter from './config/routes/routes';
import { BrowserRouter, } from 'react-router-dom';
import './App.css'
import { Provider } from 'react-redux';
import store from './core/redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter >
    </Provider>
  )
}

export default App
