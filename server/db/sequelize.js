const Sequelize = require('sequelize');
const connection = new Sequelize('bookings', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})

connection
  .authenticate()
  .then(() => {
    console.log('Connection to DB was successful!');
  })
  .catch((err) => {
    console.log('ERROR! Unable to connect to DB, more details here: ' + err);
});

const Listings = connection.define('listings', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  max_no_guests: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  infant_guest_eligible: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  price_per_night: {
    type: Sequelize.DECIMAL (10, 2),
    allowNull: false
  },
  service_fee: {
    type: Sequelize.DECIMAL (10,2),
    allowNull: false
  },
  cleaning_fee: {
    type: Sequelize.DECIMAL (10,2)
  },
  extra_guest_fee: {
    type: Sequelize.DECIMAL (10,2)
  },
  security_deposit: {
    type: Sequelize.DECIMAL (10,2)
  },
  value_added_tax: {
    type: Sequelize.DECIMAL (10,2)
  },
  local_taxes: {
    type: Sequelize.DECIMAL (10,2)
  }
});

const Dates = connection.define('dates', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  weekday: {
    type: Sequelize.STRING,
    allowNull: false
  },
  month: {
    type: Sequelize.STRING,
    allowNull: false      
  },
  day: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

const Listings_Dates = connection.define('listings_dates', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true      
  },
  available: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

const Test_Listings = connection.define('test_listings', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  max_no_guests: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  infant_guest_eligible: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  price_per_night: {
    type: Sequelize.DECIMAL (10, 2),
    allowNull: false
  },
  service_fee: {
    type: Sequelize.DECIMAL (10,2),
    allowNull: false
  },
  cleaning_fee: {
    type: Sequelize.DECIMAL (10,2)
  },
  extra_guest_fee: {
    type: Sequelize.DECIMAL (10,2)
  },
  security_deposit: {
    type: Sequelize.DECIMAL (10,2)
  },
  value_added_tax: {
    type: Sequelize.DECIMAL (10,2)
  },
  local_taxes: {
    type: Sequelize.DECIMAL (10,2)
  }
});

Listings_Dates.belongsTo(Listings);
Listings_Dates.belongsTo(Dates);

connection.sync();

module.exports = {
  Listings: Listings,
  Dates: Dates,
  Listings_Dates: Listings_Dates,
  Test_Listings: Test_Listings
};