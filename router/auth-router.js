// Write the routing logic for the server
import express from 'express';
import { getAuth } from '../controller/check-auth-controller';
const router = express.Router();

router.post('/authcheck',getAuth);

export default router;