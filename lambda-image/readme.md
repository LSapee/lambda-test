# 작업중 있었던 문제 사항

```
curl localhost:8080/2015-03-31/functions/function/invocations -d '{"payload":true}'
```
위 명령어 입력시 나온다는 로그를 명령어를 친대서 확인하다가 나중에 도커실행 했던 터미널에서 발견하여 시간 지연

```
docker run -it -v $PWD/exodus:/tmp --entrypoint /bin/bash public.ecr.aws/lambda/nodejs:14
```
파일 경로를 lambda-image에서 해당 명령어를 실행 하였어야 했으나 그 상위 파일에서 실행하여 lambda-test의 폴더에 exodus폴더가 생기고 해당 경로로
docker에 연결하여 내부 파일이 발견 안되는 문제가 발생

```
aws s3api create-bucket \
--bucket lacti-photo-optimizer-test1 \ 
--create-bucket-configuration LocationConstraint=ap-northeast-2
```
위 명령어로 버킷을 만들 었을때 퍼블릭 엑세스가 차단되어 있어서 AWS UI에서 S3버킷 정보에 가서 퍼블릭 액세스 차단을 비활성으로 바꿔주고 s3-bucket-policy.json파일을 업로드 하였다.

```
 aws s3 rb --force s3://lacti-phto-optimizer-test1
```

버킷안에 파일이 있어도 강제 삭제하는 옵션 --force


```
Failed to create/update the stack. Run the following command
to fetch the list of events leading up to the failure
aws cloudformation describe-stack-events 
```

aws cloudformation 생성에 실패 하였다.


```
aws cloudformation describe-stack-events --stack-name 스택이름
```
해당 명령어로 로그를 찾아보니 로그에서 FAILED를 2개 발견하였다. 
아마 S3 버킷을 생성하려 하였으나 해당 버킷이 존재하여 에러가 발생
```
 {
            "StackId": "왠지 보이면 안될 것 같은것",
            "EventId": "OAI-CREATE_FAILED-2023-05-03T16:21:07.703Z",
            "StackName": "cfn-photo-optimizer-infra",
            "LogicalResourceId": "OAI",
            "PhysicalResourceId": "",
            "ResourceType": "AWS::CloudFront::CloudFrontOriginAccessIdentity",
            "Timestamp": "2023-05-03T16:21:07.703000+00:00",
            "ResourceStatus": "CREATE_FAILED",
            "ResourceStatusReason": "Resource creation cancelled",
            "ResourceProperties": "{\"CloudFrontOriginAccessIdentityConfig\":{\"Comment\":\"?? ??? ???? OAI\"}}"
        },
        {
            "StackId": "왠지 보이면 안될 것 같은것",
            "EventId": "PhotoBucket-CREATE_FAILED-2023-05-03T16:21:07.234Z",
            "StackName": "cfn-photo-optimizer-infra",
            "LogicalResourceId": "PhotoBucket",
            "PhysicalResourceId": "",
            "ResourceType": "AWS::S3::Bucket",
            "Timestamp": "2023-05-03T16:21:07.234000+00:00",
            "ResourceStatus": "CREATE_FAILED",
            "ResourceStatusReason": "lacti-photo-optimizer-test3 already exists",
            "ResourceProperties": "{\"BucketName\":\"lacti-photo-optimizer-test3\"}"
        },

```

오타로 hostedZoneName 뒤에 .을 안 써서 생긴 에러

```
 {
     "StackId": "왠지 보이면 안될 것 같은것",
     "EventId": "PhotoCdnDns-CREATE_FAILED-2023-05-03T16:42:30.943Z",
     "StackName": "cfn-photo-optimizer-infra",
     "LogicalResourceId": "PhotoCdnDns",
     "PhysicalResourceId": "",
     "ResourceType": "AWS::Route53::RecordSet",
     "Timestamp": "2023-05-03T16:42:30.943000+00:00",
     "ResourceStatus": "CREATE_FAILED",
     "ResourceStatusReason": "No hosted zones named 도메인 이름 found",
     "ResourceProperties": "{\"AliasTarget\":{\"HostedZoneId\":\"Z2FDTNDATAQYW2\",\"DNSName\":\"ddb9n2vfhk3q8.cloudfront.net\"},\"Type\":\"A\",\"HostedZoneName\":\"studynodejs.com\",\"Name\":\"studynodejs.com\"}"
 },

```