# Bloomint (Frontend)

With the increase of time spent at home during the pandemic, many people have turned to houseplants to greenify their living spaces. Bloomint aims to assist new plant owners by providing an easy way to catalogue houseplants, find care instructions, and receive reminders of when to water or fertilize their plants. Project is currently at MVP stage, future planned releases include handling image upload, push notifications to mobile devices for watering, and search functionality for plant types.

See the sister repository containing backend code [here](https://github.com/chantellechan1/bloomint-backend).

| Sign In | Home | All Plants | Single Plant | Edit Plant |
| :---: | :---: | :---: | :---: | :---: |
| ![sign in page](https://github.com/chantellechan1/bloomint-frontend/blob/main/docs/images/sign_in.png) | ![home page](https://github.com/chantellechan1/bloomint-frontend/blob/main/docs/images/home.png) | ![all plants page](https://github.com/chantellechan1/bloomint-frontend/blob/main/docs/images/all_plants.png) | ![single plant page](https://github.com/chantellechan1/bloomint-frontend/blob/main/docs/images/single_plant.png) | ![edit page](https://github.com/chantellechan1/bloomint-frontend/blob/main/docs/images/edit_plant.png) |

## Changing location of the server
look in
src/services/AxiosService.tsx

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!  

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### Android Deployment (Compile to APK)
To run on android [follow this guide](https://capacitorjs.com/docs/android#adding-the-android-platform). Once installation is complete, run the following commands.  
* commands to run
    1. `npm run build`
    2. `npx cap sync`
    3. `npx cap open android`
    4. `npx cap run android`  
    
Once Android Studio is open, navigate to Build > Build Bundle(s) / APK (s) > Build APK(s). This will build an APK file and creates a notification when the build process is complete.
