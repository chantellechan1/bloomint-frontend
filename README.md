# bloomint-frotned
React Native frontend project for an open source plant care app. Individual care scheduling and reminders for your plants, recommendations and more. 


## initial setup
install node:  
https://github.com/nodesource/distributions/blob/master/README.md#deb

install expo:
```npm install -g expo-cli```
and update it!
```sudo expo update```:

install packages.json:
```npm install```

## running the project
run:
```npm start```

To run your project, navigate to the directory and run one of the following npm commands.

- cd bloomint
- npm start # you can open iOS, Android, or web from here, or run them directly with the commands below.
- npm run android
- npm run ios # requires an iOS device or macOS for access to an iOS simulator
- npm run web

### to connect an android device to a bloomint-backend running locally
The following steps have only been tested on mac:
1. Install the Android Debug Bridge from https://developer.android.com/studio/releases/platform-tools
    * unzip the download to a directory of your choosing (do not commit this directory to the project)
2. Enable USB debugging on your android device
    * follow [this guide](https://reactnative.dev/docs/running-on-device#running-your-app-on-android-devices)
    * steps 1 and 2 detail how to do this
    * in our case, since `adb` is not installed globally, we run `<install directory>/adb devices` to see connected devices
3. give the usb connected android device access to the 
    * As [detailed in this guide](https://reactnative.dev/docs/running-on-device#method-1-using-adb-reverse-recommended) run `<install directory>/adb reverse tcp:<port which flask server is running> tcp:<port which flask server is runing>`
    * specifically, if the flask bloomint-backend api is running on port 5000, and you are in the directory that the `adb` tool exists in:
        * `./adb reverse tcp:5000 tcp:5000`
    * also see [this stackover answer for options](https://stackoverflow.com/a/46795769)
        * one of these alternatives suggests using a tool called `ngrok`, which `expo` already uses under the hood for tunnelled urls
        * this may mean that if tunneled url is selected, it may be possible to access localhost on the host device without setting up adb, but this is untested