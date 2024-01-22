#!/bin/sh

if [ -e .env.template ]; then
    printf 'initializing .env.* files...\n'
    if [ -e .env.development ]; then
        printf 'WARNING: .env.development already exists, remove it to initialize\n'
    else
        cp .env.template .env.development
    fi
    if [ -e .env.test ]; then
        printf 'WARNING: .env.test already exists, remove it to initialize\n'
    else
        cp .env.template .env.test
    fi
else
    printf '.env.template not exists' >&2
    exit 1
fi
