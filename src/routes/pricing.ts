import { Router } from "express"
import { getPricingDetails, postData, getData } from "../controllers/pricing";

const router: Router = Router();
const VERSION: string = "/v1"

router.get(`${VERSION}/get_data`, getData)

router.post(`${VERSION}/post_data`, postData)

router.get(`${VERSION}/ride_price`, getPricingDetails)

export default router