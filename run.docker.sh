set -x

docker build . -t alpakaaleen
docker rm alpakaaleen
docker run -p $1:$1 --memory="1g" --cpus="1.0" --name=alpakaaleen \
 -e PORT=$1 \
 -e ENV=production \
 -e POSTGRES="postgresql://root@host.docker.internal:5432/alpakaaleen" \
 alpakaaleen:latest
