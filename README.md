# Crypto Ratios

This project serves for watching ratios between given crypto currencies.

For example, my favorite is MATIC/XRP, being targeted as ***[base] / [quote]*** in this project.

Currently, it works, but need some improvements to make it more flexible:

### TOFIX
- ~~Netlify doesn't accept non-httpS connection, therefore the CryptoBE json 
  can't be accessed from the React FE. So, possible solutions so far:~~
  - ~~Install free Let's Encrypt or paid SSL certificate on yasbas.com.~~
  - ~~Move React FE app to self-hosting with http serving.~~
  ~~Solution was to instal Lets Encrypt for yasbas.com.
  Info: https://www.drupal.org/https-information~~
## TODO
- Add field for setting the BE url and store it to local Storage.
- ~~Add coins prices and the ratio as a 3rd row in the position block.~~
- What about adding SHORT positions like in the XRP / BTC  trade ?
- ***[In Progress]*** ...
- ~~Style position box.~~
- ~~Format positive and negative metrics.~~
- ~~Add Account data to BE and FE.~~




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Currently the project's repo is hosted on both GitHub and GitLab. For GitHub, the private key id_rsa is used.
For GitLab id_supergeek private key is used. To add additional ssh key for usage in authentication process with 
GitLab, add the ssh key in the ~/.ssh/config file, like this:
```
# ~/.ssh/config
# GitLab.com
Host gitlab.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/gitlab_com_rsa

# Private GitLab instance
Host gitlab.company.com
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_supergeek
```

For more info about ssh keys related stuff: https://docs.gitlab.com/ee/user/ssh.html#rsa-ssh-keys

DEPLOY NOTE: when importing the DB in PhpMyAdmin on CPanel, it might need to edit the SQL dump file and replace 'utf8mb4' 
with just 'utf8'. Also, while editing the SQL dump file, replace the site base url 'http://localhost:8001' with 
the actual domain nime, e.g.: http://yasbas.com/cryptobe/web.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
