#!/bin/sh

ARCH=`uname -m`
if [ $ARCH == "arm64" ]
then
  docker buildx build --platform linux/amd64 -t get_compound_usdc_data . --load
  exit 0
fi

docker build -t get_compound_usdc_data .
