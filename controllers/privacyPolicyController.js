import { generatePPViewData } from '../utils/viewData.js';

export const privacyPolicyController = async (req, res) => {
    setTimeout(() => {
        var viewdata = generatePPViewData(req.lang);

        res.render('privacy-policy', viewdata);
    }, 300);
};
