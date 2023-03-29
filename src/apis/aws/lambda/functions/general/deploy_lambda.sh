#! /bin/bash

FN_PATH="$PWD/$1"


cd "$FN_PATH" || exit

rm -rf "build/"

echo 'Bulding...'
tsc "${PWD}"/*.ts --outDir ./build  --outDir "./build/" -t esnext -m esnext > /dev/null
# cp /path to/package.json build/

echo 'Zipping...'

cd build || exit
zip -r9q code.zip .

# echo root directory

# echo 'Publishing...'
aws lambda update-function-code --function-name "FUNCTION_NAME" --zip-file fileb://code.zip > /dev/null

# cd ../
rm -rf build/