#!/usr/bin/env bash

###########################################deploying vue################################################################

echo "{\"projects\":{\"default\" : \"$projectId\"}}" > .firebaseserc
#installing vue cli
npm install @vue/cli
#installing firebase tools
npm install firebase-tools
#building vue application
npm run build
#deploying to firebase
firebase deploy --token "$firebaseToken"

###########################################deploying node backend#######################################################