# Address Book

![frontend-pipeline-status](https://github.com/mehmetumit/address-book/actions/workflows/frontend-pipeline.yaml/badge.svg)
![backend-pipeline-status](https://github.com/mehmetumit/address-book/actions/workflows/backend-pipeline.yaml/badge.svg)
![compose-pipeline-status](https://github.com/mehmetumit/address-book/actions/workflows/compose-pipeline.yaml/badge.svg)
![https://codecov.io/gh/mehmetumit/address-book](https://img.shields.io/codecov/c/github/mehmetumit/address-book/master.svg)

---
## About
This project aims to provide a hands on cloud native solution for personal contact management.
## Usage
> All services are running behind an Nginx reverse proxy. The individual service ports are not directly exposed to the host machine. Which help us to manage our environment.

> The default configuration pulls backend and frontend images from Docker Hub. If you want to use a locally built version of the images, you can modify the image references to point to your local versions.

> By defaul nginx using port `80`. In order to change that you need to edit `nginx/conf.d/defaul.conf` and nginx service in `docker-compose.yml` .
```sh
# Clone the repository
git clone https://github.com/mehmetumit/address-book.git
# Change directory
cd address-book
# Set default .env
cp .env.template .env
# Initialize containers
docker-compose up -d
```
## Service Endpoints
* Web client: `http://localhost`
* Grafana: `http://localhost/grafana`
* Prometheus server: `http://localhost/prometheus`
* Backend API: `http://localhost/api/v1`
* Backend OpenAPI Doc: `http://localhost/api/v1/doc`
## Example System Design And Application Lifecycle
![system_design_and_application_lifecycle](docs/img/design1.png)
