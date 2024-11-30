#!/usr/bin/env bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
source $SCRIPT_DIR/../.env 2>/dev/null

if [ $? -ne 0 ]; then
    echo "Error: .env file not found"
    exit 1
fi

if [ -z "$HOST" ]; then
    echo "Error: HOST not found in .env file"
    exit 1
fi

if [ -z "$USERNAME" ]; then
    echo "Error: USERNAME not found in .env file"
    exit 1
fi

PROGRAM=$(cat program.json 2>/dev/null)

if [ $? -ne 0 ]; then
    echo "Error: program.json file not found"
    exit 1
fi

NAME=$(echo $PROGRAM | jq -r ".name")
FILES=$(cat package.json 2>/dev/null | jq -r ".files[]")
echo "Files: $FILES"

if [ -z "$NAME" ]; then
    echo "Error: program name not found in program.json"
    exit 1
fi

echo "Deploying $NAME to $HOST"

for file in $FILES; do
    # echo "Uploading $file"
    scp -r $SCRIPT_DIR/../$file $USERNAME@$HOST:/mojo/program/$NAME/
done
# scp -r $SCRIPT_DIR/../dist $USERNAME@$HOST:/mojo/program/$NAME/
# scp $SCRIPT_DIR/../program.json $USERNAME@$HOST:/mojo/program/$NAME/

# Restart the program
# ssh $USERNAME@$HOST "program:restart $PROGRAM"    # This kills all current ssh sessions. Need to find a better way to restart the program.
