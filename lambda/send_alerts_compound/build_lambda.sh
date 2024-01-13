#!/bin/sh

ARCH=`uname -m`
if [ $ARCH == "arm64" ]
then
  docker buildx build --platform linux/amd64 -t send_alerts_compound . --load
  exit 0
fi

docker build -t  send_alerts_compound .
