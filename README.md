## Install

```
git clone git@github.com:yao-dev/next-app-generator.git
npm link
```

## Use cases

**Create new app**

```
yo next-app-generator new-app
```

**Create new page**

```
yo next-app-generator:page homepage
```
And go to http://localhost:3000/homepage

**Create new component**

```
yo next-app-generator:component component-name
```

## Start app

Enter in new-app project then run :

**Dev mode**
```
npm run dev
```

**Prod mode**

```
npm run build
npm run start
```

## Unit tests & coverage

```
npm test
```

**With coverage**
```
npm run test:coverage
```
And go to (path/of/your/system/new-app/coverage/lcov-report/index.html)

## Deploy with now.sh

```
npm run deploy
```
