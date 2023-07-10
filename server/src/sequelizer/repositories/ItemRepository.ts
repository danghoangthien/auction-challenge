import sequelize from "./../mySequelize";
import Item from "./../models/Item";

export default sequelize.getRepository(Item);