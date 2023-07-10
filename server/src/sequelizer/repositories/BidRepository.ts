import sequelize from "../mySequelize";
import Bid from "../models/Bid";

export default sequelize.getRepository(Bid);