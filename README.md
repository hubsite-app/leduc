# General Setup

Before deploying or running skaffold, be sure to replace all instances of `itsdevin/*`
Docker Hub references with your own Docker Hub images.

# Todo

- Search of Daily Reports, if I search Creekrise and Todd, I should get daily reports

# Development

## Docker Compose

- `docker-compose up`

## Skaffold

- `skaffold dev`
  - NOTE - if you have this error: `updates to statefulset spec for fields other than 'replicas', 'template', and 'updateStrategy' are forbidden`
  - run the command again - haven't found a better fix for this

# Production

## Kubernetes Setup

- Domain / Load-balancer Resource: https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes

- Create a k8s cluster on your preferred hosting platform (at least 2vCPU, 4GB Memory, 100Gb Disk)

- Add load balancer `kubectl apply -f ./k8s-misc/load-balancer.yaml`

- Once created, get external IP address of 'ingress-nginx-controller' using `kubectl get svc -n ingress-nginx`

- Install cert manager `kubectl apply --validate=false -f ./k8s-misc/cert-manager.yaml`

- Put the email address associated with your domain in ./k8s-misc/prod-issuer.yaml

- Create production issuer `kubectl create -f ./k8s-misc/prod-issuer.yaml`

- If using Digital Ocean

  - Create an A record for workaround.<your-domain> in your DNS management service, using the external IP from 'ingress-nginx-controller'

  - Edit the 'do-loadbalancer-hostname' variable in `ingress-nginx-svc.yaml` file with the domain you've just created (workaround.<your-domain>)

  - `kubectl apply -f ./k8s-misc/ingress-nginx-svc.yaml`

- Place your domains in the `./k8s/ingress-service.yaml` file

- `kubectl apply -f ./k8s/ingress-service.yaml`

- Check certificate `kubectl describe certificate <name>-tls`

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

## App Deployment

- Create CircleCI project and add necessary environment variables (DOCKERHUB_PASS, DOCKERHUB_USERNAME, KUBERNETES_CLUSTER_CERTIFICATE, KUBERNETES_SERVER, KUBERNETES_TOKEN)

- Ensure .circleci/config.yaml has the correct Image Names for SERVER_IMAGE_NAME and CLIENT_IMAGE_NAME

- Create required secrets

  - `kubectl create secret generic server-secrets --from-literal=mongoURI=<value> --from-literal=jwtSecret=<value> --from-literal=elasticsearchPassword=<value>`

- Deploy to your branch and ensure CircleCI passes
