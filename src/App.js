import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Messenger from './routes/messenger/messenger.components';
import Profile from './routes/profile/profile.component';
import Authentication from './routes/authentication/authentication.component';
import ProtectedRoutes from './components/protected-route/protected-route';



function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Authentication/>} />
        <Route element={<ProtectedRoutes/>} >
          <Route path='/home' element={<Navigation/>}>
            <Route index element={<Home/>} />
            <Route path='/home/messages' element={<Messenger/>} />
            <Route path='/home/profile' element={<Profile/>} />
          </Route> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;
