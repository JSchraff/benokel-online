
echo "{"projects":{"default" : "$projectId"}}" > .firebaseserc
#installing firebase tools
npm install -g firebase-tools
#building vue application
npm run build
#deploying to firebase
firebase deploy --token $firebaseToken