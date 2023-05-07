import type {AWS} from "@serverless/typescript";
import resources from "./s3-cloudfront.json";

const config : AWS = {

    service :"photo-optimizer-api",
    frameworkVersion: "3",
    provider:{
        name:"aws",
        runtime:"nodejs14.x",
        region:"ap-northeast-2",
    },
    functions:{
        optimizeAndUpload : {
            handler: "handler.optimizeAndUpload",
            events:[
                {
                    httpApi: {
                        path : "/optimizeAndUpload",
                        method : "put",
                    },
                },
            ],
        },
    },
    custom:{
        scripts:{
            hooks: {
                "webpack:package:packageModules":
                    "cp jpegoptim.tar.gz .webpack/service",
            },
        },
    },
    plugins: ["serverless-plugin-scripts","serverless-webpack"],
    resources,
};
export = config;