#!/bin/bash
if [ "$NODE_ENV" = "dev" ]; then
	    npm run start &
    elif [ "$NODE_ENV" = "prod" ] || [ "$NODE_ENV" = "stg" ]; then
	    npm run start &
	fi
echo 'Node server started!'

wait