#!/bin/sh
if [ -d "$HOME/address-book" ]; then
	printf 'App folder exists! Seems like compose already initialized!\n'
	exit 1
else
	# Pull repo and run compose
	cd ~; git clone 'https://github.com/mehmetumit/address-book/'; cd address-book; docker-compose up -d
fi
