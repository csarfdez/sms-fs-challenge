
module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define(
    "Item",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      city: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.DATEONLY,
      },
      end_date: {
        type: Sequelize.DATEONLY,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      status: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      }
    },
    {
      tableName: "Items",
    }
  );
  return Item;
};