#!/bin/sh

# Stop on first err
set -e

deploy_frontend(){
	# Simplfy writing scripts by piping script text into ssh
	# Don't forget to add ssh key to the agent
	cat ./scripts/pull_frontend.sh | ssh $SV_USER@$SV_HOST
}

# Check if variables exist or not
[ ! -z "$SV_HOST" ] && [ ! -z "$SV_USER" ] && deploy_frontend || ( echo 'Error occurred!' >&2; exit 1 )
