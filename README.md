# React + TypeScript + Vite

This project list data from the `https://disneyapi.dev/` in a data table and in a pie chart.

You can see a production version of the in `https://fabio012119.github.io/login`.
Please log in with the credentials I have given you.

## Getting Started

Clone the repo:

```bash
https://github.com/Fabio012119/disney-characters-app.git
```

First, install node modules development server:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Decisions made

- For the characters table AG Grid was used [`ag-grid-community`](https://www.npmjs.com/package/ag-grid-community)
- For the pie chart the highcharts library [`highcharts`](https://www.npmjs.com/package/highcharts)
- To export the pie charts data i used [`xlsx`](https://www.npmjs.com/package/xlsx)
- Tailwind CSS is used for styling [`tailwindcss`](https://www.npmjs.com/package/tailwindcss)
- Basic E2E flow tests has been added. Now we only test for desktop devices
  For the e2e test was used [`playwright`](https://www.npmjs.com/package/playwright)
  -To host the project in GitHub pages I used [`gh-pages`](https://www.npmjs.com/package/gh-pages?activeTab=dependencies)

## Run tests

```bash
npm run test
# or
yarn test
# or
pnpm test
# or
bun test
```

The tests start automatically. If after the tests are completed you wish to see a report of your tests run:

## Show test report

```bash
npm run test-report
# or
yarn run test-report
# or
pnpm run test-report
# or
bun run test-report
```

Playwright will open a window at `http://localhost:9323` in which you can see the report of the test.
Along with a video of your app being tested by playwright bots and all the steps of the testing process.
