# General Setup

Before deploying or running skaffold, be sure to replace all instances of `itsdevin/*`
Docker Hub references with your own Docker Hub images.

# Development

## Docker Compose

- `docker-compose up`

## Skaffold

- `skaffold dev`
  - NOTE - if you have this error: `updates to statefulset spec for fields other than 'replicas', 'template', and 'updateStrategy' are forbidden`
  - run the command again - haven't found a better fix for this

# Production

## Elasticsearch

- `kubectl apply -f ./k8s-es/kube-devops.yaml`

- Create Password Beforehand: https://github.com/elastic/cloud-on-k8s/issues/967#issuecomment-497636249

  - `kubectl create secret generic elasticsearch-es-elastic-user -n kube-devops --from-literal=elastic=<password>`

- `kubectl apply -f ./k8s-es/es-master.yaml -f ./k8s-es/es-client.yaml -f ./k8s-es/es-data.yaml`

- OR create password after

  - Shell into `es-client` deployment and run `bin/elasticsearch-setup-passwords auto -b` and save the output from the command

  - Create a secret containing the password for user `elastic`

    - This password will be used to login to Kibana in production w/ username `elastic`

  - `kubectl create secret generic elasticsearch-secrets -n kube-devops --from-literal=password=<user-elastic-password>`

- `kubectl apply -f ./k8s-es/kibana.yaml`

- `kubectl apply -f ./k8s-es/ingress.yaml`
