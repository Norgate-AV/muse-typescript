#!/usr/bin/env bash

set -e

read -p "Transfer files now? (Y/n): " REPLY
if [[ ! $REPLY =~ ^[Yy]$ ]] && [ ! -z "$REPLY" ]; then
    exit 0
fi

echo

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

if [ -z "$USER" ]; then
    echo "Error: USER not found in .env file"
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

echo "Transferring files to $HOST..."
scp -r $files $USER@$HOST:/mojo/program/$name/

echo -e "\nRestarting program..."
ssh $USER@$HOST "program:restart $name"
