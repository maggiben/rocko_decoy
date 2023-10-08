#!/bin/sh

if [ -z "$1" ]
  then
    echo "Usage: ${0} <environment>"
    exit 1
 fi

ROCKO_ENV=$1
echo "Deploying lambda to ${ROCKO_ENV}"
aws lambda update-function-code --no-cli-pager --region=us-east-2 --function-name ${ROCKO_ENV}-get_compound_usdc_data --zip-file fileb://dist/get_compound_usdc_data.zip
