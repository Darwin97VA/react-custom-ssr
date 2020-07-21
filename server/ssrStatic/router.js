import { Router } from 'express'
import path from 'path'
import fs from 'fs'

const router = Router()
const directoryPages = path.resolve(__dirname, 'pages')

const routes = fs.readdirSync(directoryPages).map(file=>'/'+file.split('.html')[0])

router.get('*', (req, res, next) => {
    const route = routes.find(route=>route===req.url||route+'/'===req.url)
    if(route) {
        const file = path.resolve('./server/ssrStatic/pages'+route+'.html')
        try {
            fs.readFile(file, 'utf-8', (err, html) => {
                if(err) {
                    console.error(err)
                    res.status(500).send('Ocurrió un error.')
                }
                else {
                    res.send(html)    
                }
            })
        } catch(e) {
            next()
        }
    } else {
        next()
    }
})

export default router