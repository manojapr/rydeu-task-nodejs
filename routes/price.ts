import { Router } from 'express';
import { getData, getPriceDetails, postData } from '../controller/price';
import { customPricingSchemaValidator, pricingForTwoCities } from '../utils/validator/validator';

const router: Router = Router();
const VERSION: string = '/v1';

router.get(`${VERSION}/get`, getData);

router.post(`${VERSION}/create`, customPricingSchemaValidator, postData);

router.post(`${VERSION}/price`, pricingForTwoCities, getPriceDetails);

export default router;
