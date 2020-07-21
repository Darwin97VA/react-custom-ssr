import path from 'path'
import fs from 'fs'
import App from '../../../src/App'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

export default async (route, getData={nombre:'Darwin'} ) => {

    const resultData = ( typeof getData === 'function'
                        ? await getData() : getData )
    const context = {}
    const appComponent = ReactDOMServer.renderToStaticMarkup(
        <StaticRouter location={route} context={context}>
            <App {...resultData} />
        </StaticRouter>
    )
    const indexFile = path.resolve('./build/index.html') // será un nivel más arriba?
    const content = fs.readFileSync(indexFile, 'utf-8')
    const html = content.replace(
        '<div id="root"></div>',
        `<div id="root">${appComponent}</div>
        <script> window.__data__ = ${JSON.stringify(resultData)}; </script>
        `
    )
    const pathFile = path.resolve('./server/ssrStatic/pages' + route + '.html')
    return fs.writeFileSync(pathFile, html)
}