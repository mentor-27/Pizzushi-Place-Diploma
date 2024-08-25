const { Router } = require('express');

const router = Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/users', require('./user'));
router.use('/categories', require('./category'));
router.use('/products', require('./product'));
router.use('/cart', require('./cart'));

module.exports = router;
