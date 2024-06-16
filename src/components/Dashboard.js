import React,{useState,useEffect} from 'react';
import {Contact} from "./contact";
import {NewContact} from "./newContact";
import { Box, Grid, TextField, Stack, Button } from "@mui/material";
import {access,secret,token} from "./AWS-keys";


const AWS = require('aws-sdk');
        
    // let contacts=[];
AWS.config.update({
    accessKeyId: {access},
    secretAccessKey: {secret},
    region: 'us-east-1', // Replace 'AWS_REGION' with your actual AWS region, e.g., 'us-east-1'
    format: 'JSON'
});
        
const dynamodb = new AWS.DynamoDB({
    region: 'us-east-1', // Replace 'AWS_REGION' with your actual AWS region, e.g., 'us-east-1'
    accessKeyId: access,
    secretAccessKey: secret,
    sessionToken:token
});
export function Dashboard(){
    const [addCon,setAddCon]=useState(false);
    const handleAddCon =()=>{
        setTimeout(()=>{setAddCon(!addCon);},500)
    }


    const [number,setNumber]=useState("");
    const handleNumber = (event) => {
            setNumber(event.target.value );
    };


    const [logged,setLogged]=useState(false);
    const [Contacts,setContacts]=useState([]);
    
    
    const [user, setUser] = useState({ number: "",password: ""});

    const handleUser = (event) => {
        let {name,value}=event.target;
        if(name==='userNumber')
            setUser({ ...user, number: event.target.value });
        else
            setUser({...user, password:event.target.value});
    };

    
    async function getData(){
        const params = {
            Key:{
                'userNumber':{
                    N:user.number
                },
                'password':{
                    S:user.password
                }
            },
            TableName: 'AWS-Project1'
        };

        try {
            let result = await dynamodb.getItem(params).promise();
            if(result.Item===undefined){
                {window.location.reload(true);}
                alert('Not found');
            }
            console.log(result);
            return result.Item;
        } catch (error) {
            console.error('Error retrieving item:', error);
            {window.location.reload(true);}
            {alert('wrong details')}
        }         
    }

    const handleEnter = async ()=>{ 
        setTimeout(()=>{
            setLogged(true);
        },1000)
        try{
            const item=await getData();
                let NewItem=(AWS.DynamoDB.Converter.unmarshall(item));
                setContacts(NewItem.contacts);
                // console.log(item);
        }catch (error) {
            console.error('Async error:', error);
        }

    }




    return (
        <div style={{minHeight:'35em'}}>
            {!logged && 
            <div style={{minHeight:'15em'}}>
                <Box sx={{ backgroundColor: "#EEEEEE", borderRadius:"0.5em" ,width: "20em", margin: "auto", padding: "1em"}}>
                    <Stack spacing={3}>
                        <TextField
                         onChange={handleUser}
                         name="userNumber"
                         value={user.number}
                         variant="outlined"
                         type='number'
                         label="Number"
                         autoComplete="off"
                         inputProps={{min:0}}
                        />
                        <TextField
                         onChange={handleUser}
                         name="userPassword"
                         variant="outlined"
                         value={user.password}
                         type="password"
                         label="Password"
                        />
                        <Button variant="contained" onClick={handleEnter}>login</Button>
                    </Stack>
                </Box>
            </div>}
          
            <Grid container spacing={3}>
            {logged && Contacts.map((present,index)=>{return (<Contact key={index} cont={present}/>)})}
            </Grid>
        
            <br />
            <center><Button variant='outlined' onClick={handleAddCon}>New Contact</Button></center>
            {addCon && <NewContact cancel={handleAddCon} />}
        </div>
    )
}