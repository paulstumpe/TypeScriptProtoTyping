import { Router } from 'express';
import UserRouter from './Users';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.get('/hello', (req,res)=>{
    res.status(200).json('haha');
    res.end();
})

// Export the base-router
export default router;
