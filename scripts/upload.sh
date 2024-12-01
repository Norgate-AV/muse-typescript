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

program_file=$(cat $SCRIPT_DIR/../program.json 2>/dev/null)

if [ $? -ne 0 ]; then
    echo "Error: program.json file not found"
    exit 1
fi

name=$(echo $program_file | jq -r ".name")
files=$(echo $program_file | jq -r ".files[]" | xargs -n1 realpath)

if [ -z "$name" ]; then
    echo "Error: name not found in program.json"
    exit 1
fi

if [ -z "$files" ]; then
    echo "Error: files not found in program.json"
    exit 1
fi

echo "Transferring files to $HOST"
scp -r $files $USERNAME@$HOST:/mojo/program/$name/

echo -e "\nRestarting program..."
ssh $USERNAME@$HOST "program:restart $name"