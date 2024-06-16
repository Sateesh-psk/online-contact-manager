import { Box, TextField, Stack, Button } from "@mui/material";
import { useState } from "react";
import {AddData} from "./contactDetails";
interface NewContactProps {
    cancel:Function;
}
export const NewContact:React.FC<NewContactProps> = ({cancel}) =>{
    const [newCon,setNewCon]=useState({names:'',number:'',gmail:'',descript:'',userNumber:'',userPassword:''})
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        let {name,value}=event.target;
        if(name==='name')
            setNewCon({...newCon,names:event.target.value})
        else if(name==='number')
            setNewCon({...newCon,number:value});
        else if(name==='gmail')
            setNewCon({...newCon,gmail:value});
        else if(name==='descript')
            setNewCon({...newCon,descript:value});
        else if(name==='userNumber')
            setNewCon({...newCon,userNumber:value});
        else if(name==='userPassword')
            setNewCon({...newCon,userPassword:value});
    }

    return (
        <div style={{backgroundColor:'#EEEEEE',height:'49em'}}>
            <Box sx={{width:'20em', margin:'auto',padding:'1em'}}>
                <Stack spacing={2}>
                    <TextField
                     autoComplete="off"
                     inputProps={{ min:0 }}
                     label='User-Number' 
                     name='userNumber'
                     onChange={handleChange}
                     type='number' 
                     required
                     variant='outlined'
                     value={newCon.userNumber}
                    />

                    <TextField 
                     autoComplete="off"
                     label='User-Password'
                     name='userPassword'
                     onChange={handleChange}
                     type='password'
                     required 
                     variant='outlined'
                     value={newCon.userPassword}
                    /> 
                    
                    <TextField 
                     autoComplete="off"
                     inputProps={{ maxLength: 21}}
                     label='Name'
                     name='name'
                     onChange={handleChange}
                     required 
                     variant='outlined' 
                     value={newCon.names}
                    />

                    <TextField
                     autoComplete="off"
                     helperText='please enter only valid indian numbers'
                     inputProps={{ min:0 }}
                     label='Number' 
                     name='number'
                     onChange={handleChange}
                     type='number' 
                     required
                     variant='outlined'
                     value={newCon.number}
                    />
                    
                    <TextField 
                     autoComplete="off"
                     helperText='please enter valid mail id'
                     label='G-mail' 
                     name='gmail'
                     onChange={handleChange}
                     type='email' 
                     variant='outlined'
                     value={newCon.gmail}
                    />

                    <TextField
                     helperText='a small line to remember this person'
                     inputProps={{ maxLength: 42 }} 
                     label='Description About Person' 
                     name='descript'
                     onChange={handleChange}
                     variant='outlined' 
                     value={newCon.descript}
                    />

                    <Stack direction='row' spacing={1}>

                        <Button
                         variant='contained'
                         sx={{backgroundColor:'#FE0000',width:'12em',color:'white',
                            ':hover':{
                                backgroundColor:'#E21818'
                            }}}
                         onClick={()=>{cancel()}}
                        >Cancel</Button>
                        <Button
                         variant='contained'
                         sx={{width:'12em',color:'white'}}
                         onClick={()=>{
                            cancel();
                            AddData(newCon); 
                         }}
                        >Submit</Button>
                        
                    </Stack>
                </Stack>
            </Box>
        </div>
    )
}