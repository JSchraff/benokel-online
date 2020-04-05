#!/usr/bin/env bash

echo "{"projects":{"default" : "$projectId"}}" > .firebaseserc
#installing vue cli
npm install @vue/cli
#installing firebase tools
npm install firebase-tools
#building vue application
npm run build
#deploying to firebase
firebase deploy --token $firebaseToken