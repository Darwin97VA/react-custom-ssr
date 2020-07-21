import { Router } from 'express'
import convert from './convert'

const router = Router()
const setDynamic = convert(router)

setDynamic('/')

export default router