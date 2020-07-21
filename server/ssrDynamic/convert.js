import fs from 'fs'
import path from 'path'
import App from '../../src/App'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

const processIndex = (res, appComponent, result, context) => new Promise((resolve, reject) => {
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
                <script> window.__data__ = ${result} </script>
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
            const resultData = ( typeof getData === 'function'
                                ? await getData(req, res) : getData )
            const context = {}
            const appComponent = ReactDOMServer.renderToStaticMarkup(
                // <Provider store={}>
                    <StaticRouter location={req.url} context={context}>
                        <App {...resultData} />
                    </StaticRouter>
                // </Provider>
            )
            return await processIndex(res, appComponent, resultData, context)
        } catch(e) {
            console.error(e)
            return res.status(500).send('Ocurrió un error.')
        }
    })
}