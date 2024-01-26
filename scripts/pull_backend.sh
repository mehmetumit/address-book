#!/bin/sh
if [ -d "$HOME/address-book" ]; then
	cd ~/app;
	# Pull new image from registry
	docker-compose pull address-book-backend;
else
	printf 'App folder not found! Container environment might not be initialized!\n'
	exit 1
fi
