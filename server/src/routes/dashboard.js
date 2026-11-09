var express = require('express');
var router = express.Router();
const DashboardController = require('../controller/Dashboard.controller');
/* GET home page. */
router.post('/dashboard', DashboardController.dashboard);
router.get('/dashboard/injmolding', DashboardController.dashboardInjmolding);
module.exports = router;