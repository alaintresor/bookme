import db from '../database/models/index.js';

const Event = db['events'];



export const createEvent = async (req, res) => {


    try {
        let { name, date, time, location, hoster } = req.body
        const event = await Event.create({
            name, date, time, location, hoster
        })
        if (event) {
            res.status(200).json({ status: 'success', event })
        }

    } catch (error) {
        console.log(error, message)
        res.status(500).json({ error })
    }
};
export const getEvents = async (req, res) => {


    try {

        const events = await Event.findAndCountAll()
        const finalEvents = events.rows.map((event) => event.dataValues);
        res.status(200).json({
          status: 'success',
          data: {
            events: finalEvents,
          },
        });

    } catch (error) {
        console.log(error, message)
        res.status(500).json({ error })
    }
};


