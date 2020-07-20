This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Installing dependencies

In order to install all project dependencies run command
```bash
yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
## Configuration

Backend API base URL is defined and can be modified in file `\frontend\src\common\api.js`. Currently it is set to `localhost:8000`.

## Sections

### Legal Act Documents

In LAD tab one can search and filter documents. User can specify starting and ending date, website, document's language, country of origin and key phrases. Clicking Search button sends request to `localhost:8000/lad/search` with json body of following format:

```json
{
  "country": ["USA"],
  "infoDateFrom": "2020-07-13",
  "infoDateTo": "2020-07-20",
  "keywords": ["School Closing"],
  "language": ["English", "Chinese"],
  "web_page": ["google.com", "bing.com"]
}
```

### Secondary documents

SSD tab serves similar purpose to LAD tab. User can filter secondary documents in the same way as described in LAD section. Clicking Search button sends HTTP POST request to `localhost:8000/ssd/search`.

### Crawler config

This section can be used to save crawler parameters and run a crawler. Clicking Run now button sends HTTP POST request to `localhost:8000/crawler/run` with json data in the  following format:

```json
{
  "day": 20,
  "dayOfWeek": "Monday",
  "hour": 13,
  "infoDateFrom": "Mon Jul 20 2020",
  "infoDateTo": "Mon Jul 20 2020",
  "isActive": true,
  "minutes": 54,
  "month": 6,
  "regex": "*.gov",
  "searchPhrases": ["phrase 1", "phrase 2"]
}
```

Clicking Save button causes sending POST request to `http://localhost:8000/crawler/saveConfig` with the same data as described above.
