#!/bin/sh

ARCH=`uname -m`
if [ $ARCH == "arm64" ]
then
  echo "You dummy, this is an M1 machine!"
  exit 1
fi

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 835780150279.dkr.ecr.us-east-1.amazonaws.com
docker tag get_pricing_cmc 835780150279.dkr.ecr.us-east-1.amazonaws.com/get_pricing_cmc:latest
docker push 835780150279.dkr.ecr.us-east-1.amazonaws.com/get_pricing_cmc:latest
