import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/home';
import OpenFile from './Components/file/openFile';
import { File } from './Components/file/file';
import AllFiles from './Components/file/allFiles';
import Login from './Components/login';
import {useNavigate, useLocation} from "react-router-dom"
import Menu from './Components/menu';
import Dashboard from './Components/dashboard';
import Setting from './Components/setting';
function App() {

  const location= useLocation().pathname;
  return (<>  
      <div className="App" dir="rtl"> 
        {
        (location==="/" || location==="/Login" )?<></>:<Menu></Menu>}
        <Routes>

          {/* <Route exact path='/' element={<Home />}></Route> */}
          <Route exact path='/' element={< Login />}></Route>
          {/* <Route exact path='/' element={< AllFiles />}></Route> */}
          <Route exact path='/OpenFile' element={< OpenFile />}></Route>
          <Route exact path='/AllFiles' element={< AllFiles />}></Route>
          <Route exact path='/Login' element={< Login />}></Route>
          <Route exact path='/Dashboard' element={< Dashboard />}></Route>
          <Route exact path='/Setting' element={< Setting />}></Route>
          <Route exact path='/Home' element={< Home />}></Route>

        </Routes>
      </div>   
    </>
  );
}

export default App;
