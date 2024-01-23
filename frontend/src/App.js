import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Register from './components/authenticate/Register';
import Qrhome from './components/Qrhome';
import Login from './components/authenticate/Login';
import Frontpage from './components/pages/Frontpage';
import Calendarhome from './components/Calendarhome';

function App() {
  return (
    <div className="App">
      
        <Routes>
          <Route path='/' element={<Frontpage/>}></Route>
          <Route path='/candidateLogin' element={<Register/>}></Route>
          <Route path='/candidateSignup' element={<Login/>}></Route>
          <Route path='/candidateqr' element={<Qrhome/>}></Route>
          <Route path='/calendar' element={<Calendarhome/>}></Route>
        </Routes>
    
    </div>
  );
}

export default App;
