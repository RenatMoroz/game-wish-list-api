import { Router } from 'express';
import * as categoryControllers from '../controllers/categoryController.js';
import * as itemControllers from '../controllers/itemController.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post('/', authenticate, categoryControllers.createGameWishListCategory);

router.get('/', authenticate, categoryControllers.getGameWishListCategory);

router.get(
  '/:categoryId',
  authenticate,
  categoryControllers.getGameWishListCategoryId,
);
router.get('/:categoryId/items', authenticate, itemControllers.getItemCategory);
router.patch(
  '/:categoryId',
  authenticate,
  categoryControllers.updateGameWishListCategory,
);

router.delete(
  '/:categoryId',
  authenticate,
  categoryControllers.deleteGameWishListCategory,
);
export default router;
