import { Router } from 'express'
import convert from './convert'

const router = Router()
const dynamic = convert(router)

dynamic('/' , req => {

})

export default router