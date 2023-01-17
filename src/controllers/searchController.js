import db from '../database/models/index.js';
const accomodations = db['accomodation'];
import { Op } from 'sequelize';
export const Search = (req, res) => {
    let { localiton, children, roomsNber, checkin, checkout } = req.body

    accomodations.findAndCountAll({
        where: {
            location: {
                [Op.iLike]: `%kig%`,
            },
        },
        include:["rooms"]
    })
        .then((result) => {
            const finalEvents = result.rows.map((event) => event.dataValues);
          const allResult=finalEvents.rooms;
          console.log(allResult)
            return res.status(200).json({ result });
        })
        .catch((error) => res.status(404).json({ error }));
};


