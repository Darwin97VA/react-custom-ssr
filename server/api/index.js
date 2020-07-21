import { Router } from 'express'

const router = Router() 

router.get('/test', (req, res) => {
    res.send('Hola mundo!')
})


export default router