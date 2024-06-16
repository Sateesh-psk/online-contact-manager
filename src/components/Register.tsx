import { Box, TextField, Stack, Button } from "@mui/material";
import { useState } from "react";
import {AddUser} from "./Database";
interface RegisterProps {
    reg:Function;
}

export const Register:React.FC<RegisterProps> = ({reg}) =>{
    const [newUser,setNewUser]=useState({number:'',password:'',})
    const handleUserSubmit = (event: React.ChangeEvent<HTMLInputElement>)=>{
        let {name,value}=event.target;
        // if(name==='name')
        //     setNewUser({...newUser,names:event.target.value})
        if(name==='number')
            setNewUser({...newUser,number:value});
        else if(name==='password')
                setNewUser({...newUser,password:value});
    }
    return (
        <div style={{backgroundColor:'#EEEEEE',height:'40.5em'}}>
            <center>Register</center>
            <Box sx={{width:'20em', margin:'auto',padding:'1em'}}>
                <Stack spacing={2}>
                    {/* <TextField 
                     autoComplete="off"
                     variant='outlined' 
                     required 
                     label='Name'
                     name='name'
                     value={newUser.names}
                     inputProps={{ maxLength: 21}}
                     onChange={handleUserSubmit}
                    /> */}

                    <TextField
                     autoComplete="off"
                     variant='outlined'
                     required
                     type='number' 
                     label='Number' 
                     name='number'
                     value={newUser.number}
                     helperText='please enter your mobile number'
                     inputProps={{ min:0 }}
                     onChange={handleUserSubmit}
                    />
                    
                    
                    <TextField 
                     autoComplete="off"
                     label='Password'
                     name='password'
                     onChange={handleUserSubmit}
                     type='password'
                     required 
                     variant='outlined'
                     value={newUser.password}
                     helperText='please save/remember your password'
                     inputProps={{ maxLength: 21}}
                    /> 
                    
                    
                    <Stack direction='row' spacing={1}>

                        <Button
                         variant='contained'
                         sx={{backgroundColor:'#FE0000',width:'12em',color:'white',
                            ':hover':{
                                backgroundColor:'#E21818'
                            }
                         }}
                         onClick={()=>{reg()}}
                        >Cancel</Button>
                        <Button
                         variant='contained'
                         sx={{width:'12em',color:'white'}}
                         onClick={()=>{
                            AddUser(newUser);
                            setTimeout(()=>{reg()},500);
                            }}
                        >Submit</Button>
                        
                    </Stack>
                </Stack>
            </Box>
        </div>
    )
}