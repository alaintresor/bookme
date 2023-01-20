import db from '../database/models/index.js';
const Room = db['Room'];
const Accomodation = db['accomodation'];
import { fileUpload } from '../helpers/multer';

export const createRoom = async (req, res) => {
  try {
    /**
     * Get accomadation id
     * get room information
     */
    if (req.user.dataValues.role !== 'admin') {
      return res.status(403).json({ message: 'admin' });
    }
    if (req.file) {
      req.body.image = await fileUpload(req);
    } else {
      req.body.image =
        'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80';
    }
    const accomodationId = req.params.accomodationId;
    const { roomType, roomCost, image,  availableRooms, children, adults } = req.body;
    /**
     * check if accomodation is there
     */

    const accomodation = await Accomodation.findOne({
      where: { id: accomodationId },
    });

    if (!accomodation) {
      return res.status(404).json({
        status: 'fail',
        message: 'No accomodation found with that ID',
      });
    }
    let facilities =
      req.body.facilities.length < 1 ? '[]' : req.body.facilities;
    try {
      JSON.parse(facilities);
    } catch (e) {
      facilities = JSON.stringify(facilities);
    }

    const newRoom = await Room.create({
      roomType,
      roomCost,
      availableRooms,
      accomodationId: accomodation.id,
      children,
      adults,
      facilities: JSON.parse(facilities),
      image
    });
    return res.status(201).json({
      status: 'success',
      data: {
        newRoom,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAndCountAll();
    const finalRooms = rooms.rows.map((room) => room.dataValues);
    res.status(200).json({
      status: 'success',
      data: {
        rooms: finalRooms,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getSingleRoom = async (req, res) => {
  try {
    const {roomType,accomodationId} = req.body;
    const room = await Room.findAndCountAll({
      where: { roomType,accomodationId },
      include: ['accomodation'],
    });
    const finalRoom = room.rows.map((item) => item.dataValues);
    if (!room) {
      return res.status(404).json({
        status: 'success',
        message: 'No room found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        room:finalRoom[0],
      },
    });
  } catch (err) {
    res.send(err);
  }
};

export const updateRoom = async (req, res) => {
  try {
    if (req.user.dataValues.role !== 'travel admin') {
      return res
        .status(403)
        .json({ status: 'fail', message: 'not traveler admin' });
    }
    const id = req.params.id;
    const { roomType, roomCost, roomDescription, taken } = req.body;
    const room = await Room.findOne({ where: { id } });

    if (!room) {
      return res.status(404).json({
        status: 'success',
        message: 'No room found with that ID',
      });
    }

    await Room.update(
      {
        roomType,
        roomCost,
        roomDescription,
        taken,
      },
      { where: { id } },
    );

    res.status(200).json({
      status: 'success',
      message: 'Room updated successfully',
    });
  } catch (err) {
    res.send(err);
  }
};

export const deleteRoom = async (req, res) => {
  try {
    if (req.user.dataValues.role !== 'travel admin') {
      return res
        .status(403)
        .json({ status: 'fail', message: 'not traveler admin' });
    }
    const id = req.params.id;
    const room = await Room.findOne({ where: { id } });

    if (!room) {
      return res.status(404).json({
        status: 'fail',
        message: 'No room found with that ID',
      });
    }

    await Room.destroy({ where: { id } });

    res.status(200).json({
      status: 'success',
      message: 'Room deleted successfully',
    });
  } catch (err) {
    res.send(err);
  }
};
