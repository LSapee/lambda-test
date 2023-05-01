import {APIGatewayProxyHandlerV2} from "aws-lambda";
import * as child_process from "child_process";
import "source-map-support/register";
import * as crypto from "crypto";
import * as fs from "fs";
import * as tar from "tar";



export const optimizeAndUpload : APIGatewayProxyHandlerV2 =async (event)=>{


    if(!event.body || !event.isBase64Encoded){
        return {statusCode:400};
    }
    const buffer =Buffer.from(event.body,"base64");
    const hash = crypto.createHash("md5").update(buffer).digest("hex");
    const filePath = `/tmp/${hash}.jpg`;
    fs.writeFileSync(filePath,buffer);
    try{
        return {cdnURL:"CDN-URL"};
    }finally {
        fs.unlinkSync(filePath);
    }

    const jpegoptimPath ="/tmp/bin/jpegoptim";
    const jpegoptimPackFile = "jpegoptim.tar.gz";
    async function unpackJpegoptim(): Promise<void> {
        return new Promise<void>((resolve,reject)=>{
            if(fs.existsSync(jpegoptimPath)){
                return resolve();
            }
            fs.createReadStream(jpegoptimPackFile).pipe(
                tar.x({strip:1,C:"/tmp"}).on("error",reject).on("close",resolve)).on("error", reject);
        });
    }
    child_process.execSync(`${jpegoptimPath} -o -s -m80 ${filePath}`);
};
