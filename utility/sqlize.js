import { Model, DataTypes, Sequelize } from 'sequelize';
import config from '../config.js';

const sequelize = new Sequelize(config.db);
class Item extends Model { }
class Fluid extends Model { }
class Energy extends Model { }

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

Fluid.init({
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
  modelName: 'fluid',
  updatedAt: false
});

sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});

Energy.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  powerInjection: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  powerUsage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idlePowerUsage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  maxStoredPower: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  storedPower: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data: {
    type: DataTypes.JSON
  }
}, {
  sequelize,
  modelName: 'energy',
  updatedAt: false
});

sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});

export {Item, Fluid, Energy};