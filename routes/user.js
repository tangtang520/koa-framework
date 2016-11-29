/**
 * Created by tangtang on 2016/11/23.
 */
const
  Router          = require('koa-router'),
  M               = require('../common/middleware'),
  userController  = require('../controllers/user'),
  router          = new Router();

router.get('/',M.verify,userController.test);

router.post('/',userController.login);


module.exports = router.routes();