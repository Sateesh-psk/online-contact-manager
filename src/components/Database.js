import {access,secret,token} from "./AWS-keys";
const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: access,
    secretAccessKey: secret,
    region: 'us-east-1', // Replace 'AWS_REGION' with your actual AWS region, e.g., 'us-east-1'
    format: 'JSON'
});

const dynamodb = new AWS.DynamoDB({
    region: 'us-east-1', // Replace 'AWS_REGION' with your actual AWS region, e.g., 'us-east-1'
    accessKeyId: access,
    secretAccessKey: secret,
    sessionToken:token
});

export function AddUser(event){
    let item={
        userNumber:parseInt(event.number), 
        password: event.password ,// Assuming 'name' is a string attribute
        count: 1 , // Assuming '' is a numeric attribute
        contacts: [
            {
                descript:'',
                gmail:'',
                key:1,
                name:'you',
                number:parseInt(event.number)
            },
        ]
        // Replace the following keys and values with your data
     // Assuming 'name' is a string attribute
    }
    const params = {
        TableName: 'AWS-Project1',
        Item:(AWS.DynamoDB.Converter.marshall(item)),
    };
    
    dynamodb.putItem(params, (err, data) => {
        if (err) {
            console.error('Error creating item:', err);
        } else {
            console.log('Item created successfully:', data);
        }
    });
}