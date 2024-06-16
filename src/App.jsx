import React,{useState} from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer'; 
import { Register } from './components/Register';
import { Dashboard } from './components/Dashboard';
import { Button,Typography } from '@mui/material';
function App() {


  const [register,setRegister]=useState(false);
  const handleRegister=()=>{
    setRegister(!register);
  }



  return (
    <div style={{backgroundColor:'#EEEEEE'}}>
      <Header />
      <div style={{marginTop:'5em'}}>
        <Dashboard />
      </div>
      {register && <Register reg={handleRegister}/>}
      {<div><center>
        <Typography variant='button'>{"To register, click "}</Typography>
        <Button varint='text' sx={{color:'inherit'}} onClick={()=>{handleRegister()}}>Here</Button>
        </center></div>}
      <Footer />
    </div>
  );
}

export default App;
