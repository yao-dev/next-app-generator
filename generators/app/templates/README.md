## Install

```
git clone git@github.com:<%= userName %>/<%= appName %>.git
cd <%= appName %>
```

## Start app

Enter in project then run :

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
And go to (path/of/your/system/<%= appName %>/coverage/lcov-report/index.html)

## Deploy with now.sh

```
npm run deploy
```
