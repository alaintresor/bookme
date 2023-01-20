import db from '../database/models/index.js';
import EmailBooking from '../utils/emailBooking.js';
import EmailRequest from '../utils/emailRequest.js';
const Accomodation = db['accomodation'];
const Book = db['book']

export const booking = async (req, res) => {
  try {

    const { accomodationId, roomType, roomNumber, dayNumber, eventId, fname,
      lname,
      email,
      title,
      country,
      phone,
      bookingForName,
      bookingForEmail,
      purpose,
      question,
      arriveTime,
      arriveDate,
      paymentMethod
    } = req.body;
    /**
     * check if accomodation is there
     */

    const accomodation = await Accomodation.findOne({
      where: { id: accomodationId },
    });
    const room = await Accomodation.findOne({
      where: { id: accomodationId },
    });
    // const event = await Event.findOne({
    //   where: { id: eventId },
    // });

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
    // if (!event) {
    //   return res.status(404).json({
    //     status: 'fail',
    //     message: 'No event found with that ID',
    //   });
    // }

    const newBooking = await Book.create({
      fname,
      lname,
      email,
      title,
      country,
      phone,
      bookingForName,
      bookingForEmail,
      purpose,
      question,
      arriveTime,
      arriveDate,
      roomType,
      accomodationId,
      eventId,
      roomNumber,
      dayNumber,
      paymentMethod
    });
    try {
      await new EmailBooking(newBooking.dataValues, accomodation.name).booking()
      await new EmailRequest(newBooking.dataValues, accomodation.name).booking()
    } catch (err) {
      console.log(err);
    }
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
export const updateBookingStatus = async (req, res) => {
  try {
    const { id, status } = req.body
    const booking = await Book.findOne({
      where: { id }
    });

    if (!booking) {
      return res.status(404).json({
        status: 'success',
        message: 'No booking found with that ID',
      });
    }
    await Book.update(
      {
        status
      },
      { where: { id } },
    );

    res.status(200).json({
      status: 'success',
      message: 'booking updated successfully',
    });
  } catch (err) {
    res.send(err);
  }
};


