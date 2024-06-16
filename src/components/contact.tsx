import React from "react";
import {Card, Typography, Grid, Stack} from "@mui/material";
interface contactProps {
    cont: {
        name: string;
        number: number;
        gmail: string;
        descript: string;
    }
}
export const Contact:React.FC<contactProps> = ({cont}) =>{
    const color_main = ["#E3FDFD","#FAF0D7","#FFDDCC","#D8D9DA","#DFFFD8","#F7C8E0","#EEEDED","#F8EDE3","#F7FBFC","#BDCDD6","#D6E6F2","#9BA4B5"];
    let randomValue = color_main[Math.floor(Math.random() * color_main.length)];
    return (
        <Grid item md={3} className="contact-card">
            <Card sx={{textAlign:'center',backgroundColor:color_main[Math.floor(Math.random() * color_main.length)],borderRadius:'0.6em',padding:'0.6em'}}>
                <Stack direction='row' spacing={1}>
                    <Stack>
                        <Typography variant='h6'>{cont.name}</Typography>
                        <Stack direction='row' spacing={1}>
                            <img src={require("./images/pngwing.phone.png")} alt="" width='23'height='23' style={{color:'inherit'}} />
                            {/* <Typography variant='subtitle1'></Typography> */}
                            <Typography variant='subtitle1'>{cont.number}</Typography>
                        </Stack>
                        <Stack direction='row' spacing={1}>
                            <img src={require("./images/pngwing.gmail.png")} alt="" width='23'height='23' style={{color:'inherit'}} />
                            <Typography variant='subtitle1'>{cont.gmail}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
                <Typography variant='body2'>{cont.descript}</Typography>
            </Card>
        </Grid>        
    )
}