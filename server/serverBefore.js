import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import fs from 'fs'
import path from 'path'

import App from '../src/App'

const app = express()
const PORT = process.env.PORT || 3040

app.get('/', (req, res) => {
    const context = {}
    const appComponent = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    )
    const indexFile = path.resolve('./build/index.html')
    fs.readFile(indexFile, 'utf-8', (err, data) => {
        if(err) {
            console.error(err)
            res.status(500).send('Ocurrióp un error.')
        } 
        if(context.status === 400) {
            res.status(400)
        }
        return res.send(data.replace(
            '<div id="root"></div>',
            `<div id="root">${appComponent}</div>
            <script> window.__data__ = {} </script>
            `
        ))
    })
})

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => console.log(`Running in ${PORT} port.`))