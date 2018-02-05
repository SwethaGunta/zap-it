#MyWonderfulApp

This is a fully working react-native app with a Hasura backend.When you clone this project, there are two tables (Tables and Data) in your database populated with some data. This project also has a login screen and the functions in the app make data API calls to the backend.

=================================================================

## Getting it running

### Cloning 

In order to get the above app running first clone the project to your local git repository.

### Prerequisites

- [Hasura CLI](https://docs.hasura.io/0.15/manual/install-hasura-cli.html)
- [Git](https://git-scm.com)
- [Android Emulator] (https://facebook.github.io/react-native/docs/getting-started.html)
- [NodeJS, npm]  (https://nodejs.org/en/)
- [yarn] (https://yarnpkg.org)

=================================================================

# Opening the app using Android Emulator
After setting up the Android environment with using the react-native docs open the avd using the cmd prompt. Change directory to "C:/Users/<user-name>/AppData/Local/Android/Sdk/tools" and then type emulator -avd Nexus_5X_API_23.
Now from GitBash cd into MyWonderfullApp and do ```$react-native run-android```
The project loads in the emulator and is ready for exploration 

--------------------------------(OR)-----------------------------

# Opening the app using Expo 
Open Expo XDE, do a login/signup and click on Open existing project. Browse to the zap-it directory and open the MyWonderfulApp folder.
Once the project loads, click on Share.
Scan the QR code using the Expo app from your phone (Install from Playstore/Appstore)
Fully working app will open on your phone

=================================================================

# Editing the project

To edit the project follow the docs (https://docs.hasura.io/0.15/manual/project/index.html)
The cluster.yaml file has information about the hasura cluster and its alias that is added to the project. 
The migrations folder consists of the schema files for creating and deleting of the tables from the cluster.
The microservices folder contains the microservice named "app" on which the project is deployed

================================================================


########....EXPLORE THE APP AND RATE .... T33PF1......###########

================================================================