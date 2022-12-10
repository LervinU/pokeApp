## How to run the project

1. Run `npm install`
2. Run `npx expo run:android`

## Alternative

1. Run `npx expo prebuild`. Both android and iOS native folder will be generated
2. Create a `local.properties` file in the android folder witch will hold the ANDROID_HOME as follows `skd.dir=~/Library/Android/sdk` or alternatively whenever you android SDK is located.
3. Copy and paste the `google-services.json` in the following path `android/app/` (btw I'm uploading this because of the nature of this project to make it's easier to test. I'm probably going to delete these credentials by the end of the month)
4. Run `npx expo run:android`

## Create the apk locally 

1. Make sure to follow steps 1 to 3 from the previous point
2. Run `eas build -p android --profile preview --local`

## If none of those work

I've created a build for this project located in this drive: https://drive.google.com/file/d/1mXQMS-5mofE_ettThUqRceonaN2jRXAw/view?usp=sharing
