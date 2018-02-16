# HAP Universal App Boilerplate

Boilerplate for all builds requiring Universal Rendering.

## Setup

1. Clone Repo
2. `yarn`
3. `yarn run start`

## Stack

### Server

* Express for Http

### Client

* React
* React Router
* Apollo

### DataLayer

* Apollo

### File Structure

```
-root
  --client
    --- apollo
          all of your apollo configs
    --- components
          react components for UI. NOT PAGES OR CONTAINERS
    --- containers
          react container components used in high level rendering (App, Main, ect..)
    --- hoc
          reusable Higher Order Components (HOCs)
    --- pages
          all of your page level containers
    --- queries
          graphql queries to attach to components via graphql(MyQuery)(MyComponent)
    --- routes
          an array of route declarations. route name should match Page component name
    --- styles
          scss or css styling
  --server
      server controls, renders appstring
    --- apollo
          server side apollo config
  --webpack
      good ole webpack configs
```

### I want to...

#### Add a Page

1. Add a component in `/client/pages`
2. Add a route in `/client/routes/` where route.name = {YourComponent}

## But what if...

1. I don't need data fetching.

Cool 😎.
Remove the apollo configuration from both `client/apollo` and `server/apollo`.

2. I want to use Redux

Great 🙃.
See step 1. Add Redux config in both `client/{redux_here}` and `server/{redux_here}`.
