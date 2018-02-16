import React from 'react'
import ReactDOMServer from 'react-dom/server'

function Html({ app, state, helmet, Js, Styles, css }) {
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()
  return (
    <html {...htmlAttrs} lang="en">
      <head>
        {/* TODO: UPDATE META */}
        <meta charSet="utf-8" />
        <meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
        <meta content="IE=edgechrome=1" httpEquiv="X-UA-Compatible" />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=10.0, user-scalable=1"
          name="viewport"
        />

        <meta content="NEA Shared Decision Making" name="description" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@nationaleczema" />
        <meta name="twitter:title" content="NEA SDM" />
        <meta
          name="twitter:image:alt"
          content="NEA Shared Decision Making: NEA SDM"
        />
        <meta
          name="twitter:description"
          content="This is a description for NEA SDM"
        />
        <meta name="twitter:image" content="TWITTER IMAGE HERE" />
        <meta
          property="og:site_name"
          content="National Eczema Association Shared Decision Making"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image" content="https://sdm.nea.org/YOURPICHERE" />

        {/* TODO: ADD FAVICON IMAGES 📸 */}

        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta name="theme-color" content="#ffffff" />
        <Styles />

        <title>NEA | Shared Decision Making</title>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: app }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              '\\u003c'
            )};`
          }}
        />
        <Js />
        {/* smile for the camera 📸 */}
      </body>
    </html>
  )
}

export default Html
