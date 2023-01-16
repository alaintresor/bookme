import db from '../database/models/index.js';
const Room = db['Room'];
const Accomodation = db['accomodation'];
const Book=db['Book']

export const booking = async (req, res) => {
  try {
    const userId=req.user.dataValues.id
    const { accomodationId, roomId,date, roomNumber,comment,dayNumber } = req.body;
    /**
     * check if accomodation is there
     */

    const accomodation = await Accomodation.findOne({
      where: { id: accomodationId },
    });
    const room = await Accomodation.findOne({
      where: { id: accomodationId },
    });

    if (!accomodation) {
      return res.status(404).json({
        status: 'fail',
        message: 'No accomodation found with that ID',
      });
    }
    if (!room) {
      return res.status(404).json({
        status: 'fail',
        message: 'No room found with that ID',
      });
    }

    const newBooking = await Book.create({
        userId,
        roomId,
        accomodationId,
        roomNumber,
        dayNumber,
        date,
        comment:comment??""
    });
    return res.status(201).json({
      status: 'success',
      data: {
        newBooking,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Book.findAndCountAll();
    const allBookings = bookings.rows.map((booking) => booking.dataValues);
    res.status(200).json({
      status: 'success',
      data: {
        bookings: allBookings,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getSingleBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await Book.findOne({
      where: { id }
    });

    if (!booking) {
      return res.status(404).json({
        status: 'success',
        message: 'No booking found with that ID',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        booking,
      },
    });
  } catch (err) {
    res.send(err);
  }
};

// export const updateRoom = async (req, res) => {
//   try {
//     if (req.user.dataValues.role !== 'travel admin') {
//       return res
//         .status(403)
//         .json({ status: 'fail', message: 'not traveler admin' });
//     }
//     const id = req.params.id;
//     const { roomType, roomCost, roomDescription, taken } = req.body;
//     const room = await Room.findOne({ where: { id } });

//     if (!room) {
//       return res.status(404).json({
//         status: 'success',
//         message: 'No room found with that ID',
//       });
//     }

//     await Room.update(
//       {
//         roomType,
//         roomCost,
//         roomDescription,
//         taken,
//       },
//       { where: { id } },
//     );

//     res.status(200).json({
//       status: 'success',
//       message: 'Room updated successfully',
//     });
//   } catch (err) {
//     res.send(err);
//   }
// };

// export const deleteRoom = async (req, res) => {
//   try {
//     if (req.user.dataValues.role !== 'travel admin') {
//       return res
//         .status(403)
//         .json({ status: 'fail', message: 'not traveler admin' });
//     }
//     const id = req.params.id;
//     const room = await Room.findOne({ where: { id } });

//     if (!room) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'No room found with that ID',
//       });
//     }

//     await Room.destroy({ where: { id } });

//     res.status(200).json({
//       status: 'success',
//       message: 'Room deleted successfully',
//     });
//   } catch (err) {
//     res.send(err);
//   }
// };
