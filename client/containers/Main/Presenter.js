import React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import universal from 'react-universal-component'

// Import Components 🔌
import { ProtectedRoute } from '../../hoc'

import routes from '../../routes' // Import Routes 🗺

import '../../styles/normalize.scss' // Import Normalize 👩🏻‍🍳
import '../../styles/base.scss' // Import Styles 💃

// Dynamic Import Component thanks to https://github.com/faceyspacey/react-universal-component 🙏🏻
const UniversalComponent = universal(props =>
  import(`../../pages/${props.page}`)
)

// The Main Container Component ⟁
const Main = props => {
  return (
    <div>
      <Switch>
        {routes.map(
          route =>
            route.auth ? (
              <ProtectedRoute
                key={route.name}
                exact={route.exact}
                path={route.path}
                render={() => <UniversalComponent page={route.name} />}
              />
            ) : (
              <Route
                key={route.name}
                exact={route.exact}
                path={route.path}
                render={() => <UniversalComponent page={route.name} />}
              />
            )
        )}
      </Switch>
    </div>
  )
}

export default Main
