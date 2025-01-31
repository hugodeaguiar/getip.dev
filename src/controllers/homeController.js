import { getIPInfo } from '../utils/ipInfo.js';

export const homeController = async (req, res) => {
    const ip = req.ip;
    getIPInfo((info) => {
        info = JSON.parse(info);

        var viewdata = {
            'ip': ip,
            'ipinfo': info
        };

        res.render('index', viewdata);
    }, ip);
};
