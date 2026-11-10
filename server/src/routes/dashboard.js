var express = require('express');
var router = express.Router();
const DashboardController = require('../controller/Dashboard.controller');
/* GET home page. */
router.get('/dashboard', DashboardController.dashboard);
router.get('/dashboard/injmolding', DashboardController.dashboardInjmolding);
router.get('/dashboard/assembly', DashboardController.dashboardAssembly);
module.exports = router;