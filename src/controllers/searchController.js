import db from '../database/models/index.js';
const accomodations = db['accomodation'];
import { Op } from 'sequelize';
export const Search = (req, res) => {
    let { location, children, roomsNber, checkin, checkout, adults } = req.body
    console.log(children)
    accomodations.findAndCountAll({
        where: {
            location: {
                [Op.iLike]: `%${location}%`,
            },
        },
        include: ["rooms"]
    })
        .then((result) => {
            const data = []
            const finalEvents = result.rows.map((event) => event.dataValues);
            finalEvents.forEach(element => {
                let rooms = element.rooms.filter(item => item.availableRooms >= roomsNber && item.children >= children && item.adults >= adults);

                if (rooms.length != 0) {
                    rooms = rooms.map(room => room.dataValues)
                    data.push(rooms)
                }
            });
            return res.status(200).json({ result: data[0] });
        })
        .catch((error) => res.status(404).json({ error }));
};


