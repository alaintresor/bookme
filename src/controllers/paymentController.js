import db from '../database/models/index.js';
import EmailBooking from '../utils/emailBooking.js';
import EmailReceipt from '../utils/emailReceipt.js';
import EmailRequest from '../utils/emailRequest.js';
const Payment = db['payment'];
const Book = db['book']
const Room = db['Room'];
const Accomodation = db['accomodation'];

export const paying = async (req, res) => {
    try {

        const { roomId, bookId, roomNumber,
            email,
            amount,
            status,
            orderNo
        } = req.body;
        /**
         * check if accomodation is there
         */


        const room = await Room.findOne({
            where: { id: roomId },
        });
        const book = await Book.findOne({
            where: { id: bookId },
        });
        const accomodation = await Accomodation.findOne({
            where: { id: room.accomodationId }
        })

        if (!room) {
            return res.status(404).json({
                status: 'fail',
                message: 'No room found with that ID',
            });
        }
        if (!book) {
            return res.status(404).json({
                status: 'fail',
                message: 'No booking found with that ID',
            });
        }

        const newPayment = await Payment.create({
            roomId,
            bookId,
            numberOfRoom: roomNumber,
            email,
            amount,
            status,
            orderNo
        });
        let currentDate = new Date().toDateString();
        let currentTime = new Date().toLocaleTimeString();
        const data = {
            orderNo,
            name: `${book.fname} ${book.lname}`,
            email,
            dateTime: `${currentDate} ${currentTime}`,
            hotel: accomodation.name,
            price: room.roomCost,
            quantity: roomNumber,
            total: (room.roomCost * roomNumber),
            paymentMethod: book.paymentMethod,
            paid: amount
        }
        console.table(data)
        try {
            await new EmailReceipt(data).paying()
        } catch (err) {
            console.log(err);
        }
        return res.status(201).json({
            status: 'success',
            data: {
                newPayment,
            },
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message);
    }
};
// export const getAllBookings = async (req, res) => {
//     try {
//         const bookings = await Book.findAndCountAll();
//         const allBookings = bookings.rows.map((booking) => booking.dataValues);
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 bookings: allBookings,
//             },
//         });
//     } catch (error) {
//         return res.status(500).json(error.message);
//     }
// };

// export const getSingleBooking = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const booking = await Book.findOne({
//             where: { id }
//         });

//         if (!booking) {
//             return res.status(404).json({
//                 status: 'success',
//                 message: 'No booking found with that ID',
//             });
//         }
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 booking,
//             },
//         });
//     } catch (err) {
//         res.send(err);
//     }
// };
// export const updateBookingStatus = async (req, res) => {
//     try {
//         const { id, status } = req.body
//         const booking = await Book.findOne({
//             where: { id }
//         });

//         if (!booking) {
//             return res.status(404).json({
//                 status: 'success',
//                 message: 'No booking found with that ID',
//             });
//         }
//         await Book.update(
//             {
//                 status
//             },
//             { where: { id } },
//         );

//         res.status(200).json({
//             status: 'success',
//             message: 'booking updated successfully',
//         });
//     } catch (err) {
//         res.send(err);
//     }
// };


