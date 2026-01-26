const pool = require('../config/db.config');


exports.createBooking = async (req, res) => {

    try {
    

        const { carName, days, rentPerDay } = req.body;

        const userId = req.user.id;


        if (!carName || !days || !Number(rentPerDay)) {
            return res.status(400).json({ message: 'Missing required booking information.' });
        }

        const totalAmount = days * rentPerDay;
        
        console.log("Total Amount:", totalAmount);
        console.log("Days:", days);

        if (rentPerDay > 2000 && days <= 365) {
            return res.status(400).json({ message: 'Invalid Inputs' });
        }

        console.log("Creating booking for user:", userId, carName, days, rentPerDay);

        const insertQuery = 'INSERT INTO bookings (user_id, car_name, days,  rent_per_day) VALUES ($1, $2, $3, $4) RETURNING id';
        const values = [userId, carName, days, totalAmount];

        const result = await pool.query(insertQuery, values);
        const { bookingId } = result[0];



        return res.status(201).json({
            success: "success",
            data: {
                message: "Booking created successfully",
                bookingId: bookingId,
                totalCost: totalAmount,
            }


        });

    } catch (error) {
        console.error("Error in createBooking:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.getBookings = async (req, res) => {

    try {

        const { summary } = req.query;


        const userId = req.user.id;
        const userName = req.user.username;

        if (summary === 'true') {
            const summaryQuery = 'SELECT COUNT(*) AS totalBookings, SUM(rent_per_day) AS totalAmountSpent FROM bookings';
            const result = await pool.query(summaryQuery);
            const summaryData = result[0];

            return res.status(200).json({
                success: "success",
                data: {
                    userId: userId,
                    username: userName,
                    totalBookings: summaryData.totalbookings,
                    totalAmountSpent: summaryData.totalamountspent,

                }
            });
        }

        const selectQuery = 'SELECT * FROM bookings';
        const result = await pool.query(selectQuery);



        if (result.length === 0) {
            return res.status(404).json({
                success: "fail",
                message: "No bookings found"
            });
        }

        return res.status(200).json({
            success: "success",
            data: {
                userId: userId,
                username: userName,
                totalBookings: result[0].totalBookings,
                totalAmountSpent: result[0].totalAmountSpent,

            }
        });
    } catch (error) {
        console.error("Error in getBookings:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


exports.updateBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { carName, days, rentPerDay } = req.body;

        if(days > 365 || rentPerDay > 2000) {
            return res.status(400).json({ message: "Invalid Inputs" });
        }

        const totalAmount = days * rentPerDay;
        const updateQuery = 'UPDATE bookings SET car_name = $1, days = $2, rent_per_day = $3 WHERE id = $4';
        const values = [carName, days, totalAmount, bookingId];
        await pool.query(updateQuery, values);
        return res.status(200).json({
            success: "success",
            data: {
                message: "Booking updated successfully",
                totalCost: totalAmount,
            }
        });
    } catch (error) {
        console.error("Error in updateBooking:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



exports.deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const userId = req.user.id;


    const query = `
      DELETE FROM bookings
      WHERE id = $1 AND user_id = $2
      RETURNING id
    `;


    console.log("bookingId:", bookingId, "userId:", userId);

    const result = await pool.query(query, [
      bookingId,
      userId,
    ]);

    console.log(result);

    if(result.length === 0) {
      return res.status(404).json({
        success: "fail",
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: "success",
      message: "Booking deleted",
    });
  } catch (err) {
    console.error("Error in deleteBooking:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};