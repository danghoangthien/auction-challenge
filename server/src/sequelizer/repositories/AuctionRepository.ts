import sequelize from "../mySequelize";
import Auction from "../models/Auction";

export default sequelize.getRepository(Auction);