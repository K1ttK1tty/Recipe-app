# Recipe-app
This application allow you find recipes you want.
##### The `/Back` directory contains the server application, and a `/Front` directory contains the web app.

# How to run
### Front
Inside /client/src/enviroment you need to create `enviroment.ts` and write following:
```
export const environment = {
    enableServiceWorker: false, // true of false
    recaptchaKey: <YOUR-RECAPTCHA-KEY>, // more on https://developers.google.com/recaptcha/docs/v3?hl=en
    vapidPublicKey: <YOUR-VAPID-PUBLIC-KEY>, // more on https://www.npmjs.com/package/web-push
    serverPath: 'http://localhost:5001/api/',
    urlWithCredentials: [`http://localhost:5001/api/refresh`, `http://localhost:5001/api/logout`],
    urlsDiscardLoading: [
        `http://localhost:5001/api/sendMessageToBot`,
        `http://localhost:5001/api/registrateUserPushSubscription`,
        `http://localhost:5001/api/sendNotification`,
    ],
};
```


Inside the `/Back` folder create file `.env` and write following:
```
PORT = 5001
JWT_ACCESS_SERCRET = <YOUR-KEY>
JWT_REFRESH_SECRET = <YOUR-KEY>

# paths 
BOT_URL='https://api.spoonacular.com/food/converse?text='
RECIPES_URL = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='
CLIENT_URL =  'http://localhost:4200'
SERVER_DIR_PATH = '...\server'
USER_DATA_PATH = '...\server\usersData'
SUBSCRIBTIONS_DATA_PATH = '...\server\usersData\_subscriptions'
API_URL = 'http://localhost:5001'
CHANGE_PASSWD_URL = 'http://localhost:4200/setNewPassword'

# mail service
SMTP_HOST = 'SMTP.mail.ru'
SMTP_PORT = 465 
SMTP_USER = <YOUR-EMAIL>
SMTP_PASSWORD = <YOUR-PASSWORD>

# database
DB_DATABASE = <YOUR-DB>
DB_PASSWORD = <YOUR-DB-PASSWORD>
DB_USER = 'root'
DB_HOST = '127.0.0.1' 

# keys
CAPTCHA_KEY = <YOUR-CAPTCHA-KEY> // more on https://developers.google.com/recaptcha/docs/v3?hl=en
RECIPES_API_KEY = <YOUR-FOOD-API-KEY> // more on https://spoonacular.com/food-api
VAPID_PUBLIC_KEY = <YOUR-VAPID-PUBLIC-KEY>, // the same as on 12 line
VAPID_PRIVATE_KEY= <YOUR-PRIVATE-VAPID-KEY> // more on https://www.npmjs.com/package/web-push

```
Then run the following commands:
```
npm install
npm start
```

Inside the `/Front` run the following commands:
```
npm install
ng serve
```
Application should run at http://localhost:4200
