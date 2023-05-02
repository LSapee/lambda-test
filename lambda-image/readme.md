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

