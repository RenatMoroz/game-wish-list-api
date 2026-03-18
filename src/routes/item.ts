import { Router } from 'express';
import * as itemControllers from '../controllers/itemController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { celebrate } from 'celebrate';

const router = Router();

router.post('/', authenticate, itemControllers.createItemCategory);

router.get('/', authenticate, itemControllers.getItemCategory);

router.get('/:itemCategoryId', authenticate, itemControllers.getItemCategoryId);

router.patch(
  '/:itemCategoryId',
  authenticate,
  itemControllers.updateItemCategory,
);

router.delete(
  '/:itemCategoryId',
  authenticate,
  itemControllers.deleteItemCategory,
);
export default router;
