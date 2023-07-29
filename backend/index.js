import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import VehiculeRoute from "./routes/VehiculeRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import VitreFumeeRoute from "./routes/VitreFumeeRoute.js"
import PoliceStationRoute from "./routes/PoliceStationRoute.js"
import VitreFumees from "./models/VitreFumeeModel.js";
import Penalties from "./models/PenaltyModel.js";
import Users from "./models/UserModel.js";
import PenaltyRoute from "./routes/PenaltyRoute.js";
import Vehicules from "./models/VehiculeModel.js";
import PoliceStations from "./models/PoliceStationModel.js";
import Amandes from "./models/AmandeModel.js";
import AmandeRoute from "./routes/AmandeRoute.js"



dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

//     (async()=>{
//         await db.sync();
//     })();

//    await Amandes.sync({ alter: true });

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(VehiculeRoute);
app.use(VitreFumeeRoute);
app.use(PenaltyRoute);
app.use(AuthRoute);
app.use(PoliceStationRoute);
app.use(AmandeRoute)


//static Images Folder

app.use('/Images', express.static('./Images'))

//  store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});
