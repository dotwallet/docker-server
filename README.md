# docker-server

A microservice for authenticating DotWallet users, processing payments, and saving data on chain.

This allows developers to quickly add DotWallet API functionality to their app.

Any use of this microservice must start with a real user [login to dotwallet](https://developers.dotwallet.com/documents/en/#user-authorization). That will generate a `code`, which the microservice will use to authenticate the request. The server will return a `server_token` with a default expiry of 30 days (can be changed in .env file). All subsequent requests require this token.

This server includes complete API endpoint documentation.
To see how to make requests to the server's API, run the app locally and go to http:localhost:3003/docs

Check out a live version of this microservice [here](https://dotwallet-microservice-xfl2wlshtq-de.a.run.app/). You can send http requests to it as per the auto generated [docs](https://dotwallet-microservice-xfl2wlshtq-de.a.run.app/docs/)

## To use

There are two ways to use this microservice:

1. Directly call the microservice from your front-end application:
   - Save the `server_token` in the client, and use for subsequent requests
2. Call the microservice from your backend server.
   - When calling the '/auth' endpoint, include the `token_redirect_uri` param.
   - Save the `server_token` on your backend. Note: the `server_token` is unique to each user.

## Google cloud run deploy

- Download and install the google cloud cli
  [reference](https://cloud.google.com/run/docs/quickstarts/build-and-deploy?hl=en_US)
- Create a project on https://cloud.google.com/run/ and then run:

```
gcloud projects list
# Find your project_id
gcloud config set project <your_project_name>
# Check with:
gcloud config get-value project
# Change the .env file to include the project_id. Then:
yarn google-build
yarn google-deploy
```

## Server deploy with docker-compose and letsencrpyt

- Add your domain name and email to the .env file
- Change the `<your_domain>`'s in deploy/nginx/prod/app.conf to your domain. i.e. my-site.com
- then:

```
yarn ssl-deploy
```

## Dev:

```
yarn dev
# test
yarn test
# with watching
yarn test-watch
```

## Build

build docker image

```
yarn build
```
