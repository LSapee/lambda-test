import {APIGatewayProxyHandlerV2} from "aws-lambda";
import "source-map-support/register";

export const hello : APIGatewayProxyHandlerV2 =async (event)=>{
    if(!event.queryStringParameters||!event.queryStringParameters.name){
        return {statusCode:400,body:`Not Found!`};
    }
    const message = `Hello,${event.queryStringParameters.name}!`;
    console.info(message);
    return {message};
}
