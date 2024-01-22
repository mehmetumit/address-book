#!/bin/sh

if [ -e .env ]; then
    printf '.env already initialized, remove it and try again' >&2
    exit 1
else
    if [ -e .env.template ]; then
        printf 'initializing .env file...'
        cp .env.template .env
    else
        printf '.env.template not exists' >&2
        exit 1
    fi
fi
