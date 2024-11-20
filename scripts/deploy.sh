#!/usr/bin/env bash

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
source $SCRIPT_DIR/../.env

PROGRAM=$(cat program.json | jq -r ".name")

echo "Deploying $PROGRAM to $HOST"

scp -r ./dist $USERNAME@$HOST:/mojo/program/$PROGRAM/
scp program.json $USERNAME@$HOST:/mojo/program/$PROGRAM/

# Restart the program
# ssh $USERNAME@$HOST "program:restart $PROGRAM"    # This kills all current ssh sessions. Need to find a better way to restart the program.
