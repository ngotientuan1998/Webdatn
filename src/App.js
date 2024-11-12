

import { BrowserRouter as Router, Route, Switch,Routes } from 'react-router-dom';
import Home from './Components/Homes/Home';
import Singin from './Components/Singin/singin';
import Login from './Components/Login/login';



function App() {
  return (
    <div>
      <Router>
      
      <Routes>
      <Route path="/" element={<Login/>} />
        
    <Route path="/signin" element={<Singin/>} />
    <Route path="/home" element={<Home/>} />
        {/* Có thể thêm các route khác ở đây */}
      </Routes>
      
    </Router>
    </div>
    
  );
}

export default App;
