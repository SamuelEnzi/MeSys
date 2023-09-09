import { Model, DataTypes, Sequelize } from 'sequelize';
import config from '../config.js';

const sequelize = new Sequelize(config.db);
class Item extends Model {}

Item.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    data: {
      type: DataTypes.JSON
    }
  }, {
    sequelize,
    modelName: 'item',
    updatedAt: false
  });

  sequelize.sync({ alter: true }).then(() => {
    console.log('Database & tables created!');
  });

  
export default Item;