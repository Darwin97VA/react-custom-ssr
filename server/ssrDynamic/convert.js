import fs from 'fs'
import path from 'path'
import App from '../../src/App'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import reducers from './../../src/redux'
import { createStore } from 'redux'

const processIndex = (res, appComponent, preloadedState, context) => new Promise((resolve, reject) => {
    try {
        const indexFile = path.resolve('./build/index.html') 
        fs.readFile(indexFile, 'utf-8', (err, content) => {
            if(err) {
                console.error(err)
                res.status(500).send('Ocurrióp un error.')
            } 
            if(context.status === 400) {
                res.status(400)
            }
            res.send(content.replace(
                '<div id="root"></div>',
                `<div id="root">${appComponent}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${JSON
                        .stringify(preloadedState)
                        .replace(/</g,'\\u003c')}
                </script>
                `
            ))
            resolve()
        })
    } catch(e) {
        reject(e)
    }
})

export default app => (route, getData={}) => {
    app.get(route, async (req, res) => {
        try {
            const preloadedState = ( typeof getData === 'function'
                                ? await getData(req, res) : getData )
            const context = {}

            const store = createStore(reducers, preloadedState)

            const appComponent = ReactDOMServer.renderToStaticMarkup(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            )
            return await processIndex(res, appComponent, preloadedState, context)
        } catch(e) {
            console.error(e)
            return res.status(500).send('Ocurrió un error.')
        }
    })
}