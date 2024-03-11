#!/bin/sh

ARCH=`uname -m`
if [ $ARCH == "arm64" ]
then
  docker buildx build --platform linux/amd64 -t get_pricing_cmc . --load
  exit 0
fi

docker build -t get_pricing_cmc .
