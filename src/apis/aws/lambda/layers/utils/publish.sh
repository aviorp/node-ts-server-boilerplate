#! /bin/bash

PKG_PATH="node_modules/utils"
LAYER_NAME="utils"

mkdir -p "$PKG_PATH"
cp package* index.mjs "$PKG_PATH"

zip -r9q $LAYER_NAME.zip node_modules 
aws s3 cp $LAYER_NAME.zip s3://gsg-global-lambda-files/layers/$LAYER_NAME.zip
aws lambda publish-layer-version --layer-name $LAYER_NAME --content S3Bucket=gsg-global-lambda-files,S3Key=layers/$LAYER_NAME.zip --compatible-runtimes nodejs18.x --compatible-architectures x86_64 > /dev/null

rm $LAYER_NAME.zip