import { getIPInfo } from '../utils/ipInfo.js';
import { generateHomeViewData } from '../utils/viewData.js';

export const homeController = async (req, res) => {
    const ip = req.ip;
    getIPInfo((info) => {
        info = JSON.parse(info);

        var viewdata = generateHomeViewData(req.lang, ip, info);

        res.render('index', viewdata);
    }, ip);
};
