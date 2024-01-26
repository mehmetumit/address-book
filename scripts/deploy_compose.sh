#!/bin/sh

# Stop on first err
set -e

deploy_compose(){
	# Simplfy writing scripts by piping script text into ssh
	# Don't forget to add ssh key to the agent
	cat ./scripts/init_compose.sh | ssh $SV_USER@$SV_HOST
}

# Check if variables exist or not
[ ! -z "$SV_HOST" ] && [ ! -z "$SV_USER" ] && deploy_compose || ( echo 'Error occurred!' >&2; exit 1 )
