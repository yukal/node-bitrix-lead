const conf = require('../config');
const Bitrix = require('../helpers/bitrixRequest');
const bitrix = new Bitrix(conf.bitrix);

const RSE = { "REGISTER_SONET_EVENT": "Y" };

exports.getLeadsList = async (req, res, next) => {
    const data = await bitrix.get('crm.lead.list');
    res.report(data).send(data.err ?data.err :data.body);
};

exports.getLeadById = async (req, res) => {
    const id = Number(req.params.id);
    const data = await bitrix.get('crm.lead.get', { id });
    res.report(data).send(data.err ?data.err :data.body);
};

exports.deleteLead = async (req, res) => {
    const id = Number(req.params.id);
    const data = await bitrix.get('crm.lead.delete', { id });
    res.report(data).send(data.err ?data.err :data.body);
};

exports.updateLead = async (req, res) => {
    const id = Number(req.params.id);
    const data = await bitrix.post('crm.lead.update', { id }, { fields: req.body, params: RSE });
    res.report(data).send(data.err ?data.err :data.body);
};

exports.createLead = async (req, res) => {
    const data = await bitrix.post('crm.lead.add', {}, { fields: req.body, params: RSE });
    res.report(data).send(data.err ?data.err :data.body);
};
