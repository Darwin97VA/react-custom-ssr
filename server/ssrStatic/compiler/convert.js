import path from 'path'
import fs from 'fs'
import App from '../../../src/App'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import reducers from '../../../src/redux'
import { createStore } from 'redux'

export default async (route, getData={} ) => {

    const preloadedState = ( typeof getData === 'function'
                        ? await getData() : getData )
    const context = {}

    const store = createStore(reducers, preloadedState)

    const appComponent = ReactDOMServer.renderToStaticMarkup(
        <Provider store={store}>
            <StaticRouter location={route} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    )
    const indexFile = path.resolve('./build/index.html') // será un nivel más arriba?
    const content = fs.readFileSync(indexFile, 'utf-8')
    const html = content.replace(
        '<div id="root"></div>',
        `<div id="root">${appComponent}</div>
        <script>
            window.__PRELOADED_STATE__ = ${JSON
                .stringify(preloadedState)
                .replace(/</g,'\\u003c')}
        </script>
        `
    )
    const pathFile = path.resolve('./server/ssrStatic/pages' + route + '.html')
    return fs.writeFileSync(pathFile, html)
}