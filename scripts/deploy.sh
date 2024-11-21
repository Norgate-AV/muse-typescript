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

if [ -z "$NAME" ]; then
    echo "Error: program name not found in program.json"
    exit 1
fi

echo "Deploying $NAME to $HOST"

scp -r ./dist $USERNAME@$HOST:/mojo/program/$PROGRAM/
scp program.json $USERNAME@$HOST:/mojo/program/$PROGRAM/

# Restart the program
# ssh $USERNAME@$HOST "program:restart $PROGRAM"    # This kills all current ssh sessions. Need to find a better way to restart the program.
