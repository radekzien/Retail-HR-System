import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import Navbar from './components/NavBar';
import AddNewEmployee from './pages/addNewEmployee'
import CreateHours from './pages/createHours'
import ViewHours from './pages/ViewHours'
import ViewPayslip from './pages/viewPayslip'
import ViewRota from './pages/ViewRota'
import CreateRole from './pages/createRole'
import RoleProvider from './contexts/roleContext';

//App
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <RoleProvider>
        <Navbar />
        <div className='pages'>
            <Routes>
              <Route
                path="/"
                element = {<Home />}
                />
                <Route
                path="/addNewEmployee"
                element = {<AddNewEmployee />}
                />
                <Route
                path="/createHours"
                element = {<CreateHours />}
                />
                <Route
                path="/viewHours"
                element = {<ViewHours />}
                />
                <Route
                path="/createRole"
                element = {<CreateRole />}
                />
                <Route
                path="/viewPayslip"
                element = {<ViewPayslip />}
                />
                <Route
                path="/viewRota"
                element = {<ViewRota />}
                />
            </Routes>
          </div>
        </RoleProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
