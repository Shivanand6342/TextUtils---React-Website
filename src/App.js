import React, {useState} from 'react'
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar'
import TextForm from './components/TextForm'
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light')
  const [navMode, setNavMode] = useState('Dark')
  const [navColor, setNavColor] = useState('dark')
  const [alert, setAlert] = useState(null)

  const toggleMode = () => {
    if(mode === 'dark'){
      setMode('light')
      setNavMode('Dark')
      setNavColor('dark')
      document.body.style.backgroundColor = 'white'
    }
    else{
      setMode('dark')
      setNavMode('Light')
      setNavColor('light')
      document.body.style.backgroundColor = '#042743'
    }
  }

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <Router>
        <Navbar title="TextUtils" mode={mode} navMode={navMode} toggleMode={toggleMode} navColor={navColor}/>
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route exact path="/about" element={<About mode={mode} />} />
            <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter Text to Analyze" mode={mode} />} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
