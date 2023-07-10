import sequelize from "../mySequelize";
import Bidder from "../models/Bidder";

export default sequelize.getRepository(Bidder);