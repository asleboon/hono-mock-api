# How do deploy using Docker and Pulumi

> Make sure Docker Deamon is running

Steps:
1. Build and test locally
2. Build and push to dockerhub
3. Redploy pulumi and it will use the latest image.

Build app & run app locally:

`docker build -t my-app . && docker run --env-file ./.env -p 8080:8080 my-app`

Build and push to dockerhub:

`docker buildx build --platform linux/amd64,linux/arm64 -t asleboon/can-i-haz-weather:latest . --push`

Deploy to pulumi:

`cd pulumi`
`pulumi up`

Most likely I am running something else on the free tier so make sure you spin that down first.

`pulumi destroy`
