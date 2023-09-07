# VisibuyProductManagement
A seperate product management app for Visibuy

# FRONTEND COMMANDS LIST
## Build app
npx eas build -p android --profile dev

## Run build
npx eas build:run -p android

## Update build
npx eas update --branch dev --message "Updating the app"

## Start local server
npx expo start

## Clear cache and start local server
npx expo start --reset-cache

adb -s b51af329 reverse tcp:8081 tcp:8081

# BACKEND COMMANDS LIST
## Start local server
npm start