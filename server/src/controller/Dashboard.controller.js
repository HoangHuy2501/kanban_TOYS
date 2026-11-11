const DashboardService = require("../services/Dashboard.service");
const ApiSuccess = require("../utils/ApiSuccess");
const { getValueByTime } = require("../utils/timeUtils");
exports.dashboard = async (req, res, next) => {
    try {
        // const { flow, StepNo } = req.query;
        // const content = req.body.data;
        // console.log(content);
        const content = [
            {
                flow: "FINSHING-TOY-GI-F11-01",
                stepNo: 798
            }, {
                flow: "FINSHING-TOY-GI-F11-01-OPA",
                stepNo: 979
            }
        ]
        if (!content || !Array.isArray(content) || content.length === 0) {
            return res.status(400).json({ error: "Missing required parameters: flow and StepNo" });
        }
        const results = await Promise.all(content.map(async (item) => {
            const { flow, stepNo } = item;
            return await DashboardService.GetDashboardData(flow, stepNo);
        }));
        return res.json(ApiSuccess.getSelect('dashboard', results));
    } catch (error) {
        return next(error);
    }
}

exports.dashboardInjmolding = async (req, res, next) => {
    try {
        const flow = getValueByTime([
            { start: "06:00", end: "14:00", value: "INJMOLDING-GI-F11-%-M" },
            { start: "14:00", end: "22:00", value: "INJMOLDING-GI-F11-%-A" },
            { start: "22:00", end: "06:00", value: "INJMOLDING-GI-F11-%-N" }
        ]);
        const results = await DashboardService.GetInjmoldingData(flow, 21);
        return res.json(ApiSuccess.getSelect('dashboardInjmolding', results));
    } catch (error) {
        return next(error);
    }
}

// bộ phận lắp ráp
exports.dashboardAssembly = async (req, res, next) => {
    try {
        const content = {
            // flow: "ASSEMBLY-GI-F11%",
            flow: "ASSEMBLY%-TOY%",
            stepNo1: 123,
            stepNo2: 810
        }
        const results = await DashboardService.GetAssemblyData(content);
        return res.json(ApiSuccess.getSelect('dashboardAssembly', results));
    } catch (error) {
        return next(error);
    }
}