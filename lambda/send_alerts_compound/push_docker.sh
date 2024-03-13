#!/bin/sh

ARCH=`uname -m`
if [ $ARCH == "arm64" ]
then
  echo "Warning, this is an M1 machine! Build with buildx"
fi

# remove --profile rocko if you are not using named profiles
aws ecr get-login-password --region us-east-1 --profile rocko | docker login --username AWS --password-stdin 835780150279.dkr.ecr.us-east-1.amazonaws.com
docker tag send_alerts_compound 835780150279.dkr.ecr.us-east-1.amazonaws.com/send_alerts_compound:latest
docker push 835780150279.dkr.ecr.us-east-1.amazonaws.com/send_alerts_compound:latest
