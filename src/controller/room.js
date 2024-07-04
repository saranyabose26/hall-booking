const rooms = [];
const bookings = [];

const createRoom = (req, res) => {
    try {
        const { roomName, room_ID, seats, amenities, pricePerHours } = req.body;
        const roomID = rooms.find((roomItem) => roomItem.room_ID === room_ID);

        if (!roomID) {
            const room = {
                roomName,
                room_ID,
                amenities,
                seats,
                pricePerHours,
            };

            rooms.push(room);
            return res.status(201).send({
                message: 'Room successfully created',
                room,
            });
        } else {
            return res.status(401).send({
                message: `Room ${roomName} already exists`,
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const bookRoom = (req, res) => {
    try {
        const { customerName,  startTime, endTime, room_ID, } = req.body 
        const bookingDate = new Date ();
        
        const room = rooms.find((roomItem) => roomItem.room_ID === room_ID);
   

        if (room) {
            const newBooking = {
                customerName,
                bookingDate,
                startTime,
                endTime,
                room_ID,
                bookingId: bookings.length + 1,
                status: 'Booked',
            };
    
            bookings.push(newBooking);
            return res.status(201).send({
                message: 'Room successfully booked',
                newBooking,
            });
        } else {
            return res.status(404).send({
                message: `Room with ID ${room_ID} not found`,
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const getRoomsBookedData = (req, res) => {
    try {
        const roomsBookedData = rooms.map((room) => {
            const roomBookings = bookings.filter((booking) => booking.room_ID === room.room_ID);

            const bookingsData = roomBookings.map((booking) => ({
                roomName:booking.roomName,
                bookedStatus: booking.status,
                customerName: booking.customerName,
                bookingDate: booking.bookingDate,
                startTime: booking.startTime,
                endTime: booking.endTime,
            }));

            return {
                roomName: room.roomName,
                bookings: bookingsData,
            };
        });

        if (roomsBookedData.length > 0) {
            res.status(200).send({
                message: "Data Fetched Successfully",
                roomsBookedData,
            });
        } else {
            res.status(404).send({
                message: "No bookings available for any room",
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const getCustomersBookedData = (req, res) => {
    try {
        const customersBookedData = bookings.map((booking) => {
            const room = rooms.find((roomItem) => roomItem.room_ID === booking.room_ID);
            
            return {
                customerName: booking.customerName,
                roomName: room ? room.roomName : 'Room not found',
                bookingDate: booking.bookingDate,
                startTime: booking.startTime,
                endTime: booking.endTime,
            };
        });

        if (customersBookedData.length > 0) {
            res.status(200).send({
                message: "Data Fetched Successfully",
                customersBookedData,
            });
        } else {
            res.status(404).send({
                message: "No bookings available for any customer",
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const customerBookingCount = (req,res)=>{
    try {
        const {customerName} = req.params;
        const customerBooking = bookings.filter((booking)=>booking.customerName === customerName)
        .map((booking)=>({
            customerName:booking.customerName,
            roomName:rooms.find((r)=>r.room_ID === booking.room_ID).roomName,
            Date:booking.date,
            startTime:booking.startTime,
            endTime:booking.endTime,
            bookingId:booking.bookingId,
            bookingDate:booking.bookingDate,
            status:booking.status
        }))
        res.status(200).send({
            message:"Data Fetched Succewssfully",
            customerBooking
        })
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            error: error.message,
        });
    }
}



export default {
    createRoom,
    bookRoom,
    getRoomsBookedData,
    getCustomersBookedData,
    customerBookingCount 
};
