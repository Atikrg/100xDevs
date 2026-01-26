require('dotenv').config({ path: './.env.local' });
const app = require('./app');
const pool = require('./config/db.config');
const morgan = require('morgan');

const authRouter = require('./routers/auth/user.auth.router');
const bookingRouter = require('./routers/booking.router');

app.use('/api/v1', authRouter);
app.use('/api/v1', bookingRouter);

app.use(morgan('dev'));

const PORT = process.env.PORT;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});