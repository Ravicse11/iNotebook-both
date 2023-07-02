import './App.css';
import Navbar from './Component/Navbar';
import About from './Component/About';
import Home from './Component/Home';
import NoteState from './context/NoteState';
import Signin from './Component/Login';
import Alert from './Component/Alert';
import Signup from './Component/Signup';
import Contact from './Component/Contact';
import UpdateUser from './Component/UpdateUser';
// import { Switch } from 'react';
import Errorpage from './Component/Errorpage';
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);

  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />

          <Routes>

            <Route path="/" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About showAlert={showAlert} />} />
            <Route path="/contact" element={<Contact showAlert={showAlert} />} />
            <Route path="/login" element={<Signin showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route path="/updateuser" element={<UpdateUser showAlert={showAlert} />} />

            <Route path="*" element={<Errorpage showAlert={showAlert} />} />

          </Routes>

          {/* <Errorpage /> */}

        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
