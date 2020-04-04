
echo "{"projects":{"default" : "$projectId"}}" > .firebaseserc
#installing vue cli
npm install -g @vue/cli
#installing firebase tools
npm install -g firebase-tools
#building vue application
npm run build
#deploying to firebase
firebase deploy --token $firebaseToken