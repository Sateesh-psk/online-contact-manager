import React, { useEffect,useState } from "react";
import {access,secret,token} from "./AWS-keys";
const AWS = require('aws-sdk');
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

export function AddData(event){
    async function getData(){
        const params = {
            Key:{
                'userNumber':{
                    N:event.userNumber
                },
                'password':{
                    S:event.userPassword
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
            // console.log(result);
            return result.Item;
        } catch (error) {
            console.error('Error retrieving item:', error);
            {window.location.reload(true);}
            {alert('wrong details')}
        }         
    }

    const handleEnter = async ()=>{ 
        try{
            const item=await getData();
            let NewItem=(AWS.DynamoDB.Converter.unmarshall(item));
            NewItem.count++;
            NewItem.contacts=[...NewItem.contacts,{
                name:  event.names , // Assuming 'name' is a string attribute
                number: event.number , // Assuming '' is a numeric attribute
                descript: event.descript ,
                gmail: event.gmail ,
                key: NewItem.count
            }]
            NewItem=(AWS.DynamoDB.Converter.marshall(NewItem))
            console.log(NewItem);

            const params = {
                TableName: 'AWS-Project1',
                Item: {
                    // Replace the following keys and values with your data
                    userNumber: NewItem.userNumber , // Assuming '' is a numeric attribute
                    password:NewItem.password,
                    contacts:NewItem.contacts,
                    count:NewItem.count// Assuming 'name' is a string attribute
                },
            };
            
            dynamodb.putItem(params, (err, data) => {
                if (err) {
                    console.error('Error creating item:', err);
                } else {
                    console.log('Item created successfully:', data);
                }
            });

        }catch (error) {
            console.error('Async error:', error);
        }
    }
    {handleEnter()}

}