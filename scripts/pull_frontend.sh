#!/bin/sh
if [ -d "$HOME/address-book" ]; then
	cd ~/address-book;
	# Pull new image from registry
	docker-compose pull address-book-frontend;
	# Rebuild and run nginx to inject new frontend code
	# Nginx image uses address-book-frontend image as builder
	docker-compose up --build nginx -d;
else
	printf 'App folder not found! Container environment might not be initialized!\n'
	exit 1
fi
