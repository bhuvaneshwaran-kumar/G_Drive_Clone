# G_Drive_Clone

A Cloud Storage clone built with ReactJS❄ and Firebase🔥.

### Features

- Login With Goolgle.
- Upload Multiple photo at once.
- Create new Album
- delete Photos and Albums.
- Download Photos

### Technology used

- **ReactJS** (FrontEnd)
  - **Material-UI**
  - **react-router-dom**
  - **redux**
  - **lodash.debounce**
- **FireBase** - BaaS (BackEnd as a Service)
  - **FireStore**
  - **Cloud Storage**
  - **Authentication**

### To run this on Local Machine

- Clone this repo, and cd into it.
- install all the dependencies form package.json.
- Create a project in Firebase Console.
- Enable Goolgle Login.
- intergrate your secret project key with your local environment.
- Run app by typing `npm start` in command line.
- Make sure to read the **Note** section below.

### Note that

- All the function which does the database transition are created in a coustom Hook and imported into the component.
  Check `src\hooks\useFireStore.js`
- You will have to create **Indexes** in firestore, as HomePage and AlbumPage uses **Compound Queries** to fetch data from firestore. While running the application for first time there will be an error in console stating you to create an Index in Firestore. That Error will provide a link to create an Index in Firestore , you can click on the link and create an Index. (This Error will be solved after that particular Index is created)
- To downlaod photo directly from firebase Storage in JS a **Blob** type, you have to enable **CORS** policy in **Google Cloud Platform**, to know more check the below links.

  - [Firebase Docs](https://firebase.google.com/docs/storage/web/download-files)
  - [StackOverFlow Answers](https://stackoverflow.com/questions/37760695/firebase-storage-and-access-control-allow-origin)
