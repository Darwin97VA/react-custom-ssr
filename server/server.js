import express from 'express'
import path from 'path'

import ssrStatic from './ssrStatic/router'
import ssrDynamic from './ssrDynamic/router'

const app = express()
const PORT = process.env.PORT || 3040

app.use(ssrStatic)
app.use(ssrDynamic)

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => console.log(`Running in ${PORT} port.`))