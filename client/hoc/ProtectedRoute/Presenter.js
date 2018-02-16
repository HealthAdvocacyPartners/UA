import React from 'react'
import { Route, Redirect } from 'react-router'

function PrivateRoute({ render, data, history, ...rest }) {
  const { loading, me, error } = data

  if (loading) {
    return <div>loading</div>
  }
  if (error) {
    history.goBack()
    return false
  }
  const authed = me.id ? true : false
  return (
    <Route
      {...rest}
      render={props =>
        authed ? (
          render()
        ) : (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
