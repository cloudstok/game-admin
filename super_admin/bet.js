const { read, write } = require('../db_config/db');
const SQL_GET_SETTLE = "SELECT  settlement_id , bet_id , lobby_id, user_id, bet_amount , balance , max_mult , status FROM settlement  order by settlement_id DESC limit ? offset ?";
const getBet = async (req, res) => {
    try {
        const { limit, offset } = req.query;
        const [data] = await read.query(SQL_GET_SETTLE, [+limit, +offset])
        const [[{ total }]] = await read.query("SELECT count(*) as total FROM aviator_game.settlement")
        return res.status(200).send({ status: true, total, data })
    } catch (er) {
        console.log(er)
        return res.status(400).send({ er })
    }
}


const roundStats = async (req, res) => {
    try {
        const { limit, offset } = req.query;
        const [data] = await read.query("SELECT * FROM round_stats order by created_at DESC  limit ? offset ?", [10, 0])
        const [[{ total }]] = await read.query("SELECT count(*) as total FROM round_stats")
        return res.status(200).send({ status: true, total, data })
    } catch (er) {
        console.log(er)
        return res.status(400).send({ er })
    }
}


module.exports = {
    getBet,
    roundStats
}