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

