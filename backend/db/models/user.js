'use strict';

const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 32],
        isNotEmail(value) {
          if (Validator.isEmail(value)) throw new Error('Username cannot be an email.')
        } 
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    password: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    access_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 80]
      }
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['email', 'password', 'createdAt', 'updatedAt', 'access_level']
      }
    },
    scopes: {
      currentUser: {
        attributes: { 
          exclude: ['password', 'createdAt', 'updatedAt']
        }
      },
      loginUser: {
        attributes: {}
      },
      allUsers: {
        attributes: {
          exclude: ['password']
        }
      },
      firstTimeCheck: {
        attributes: {
          exclude: ['username', 'email', 'password', 'createdAt', 'updatedAt', 'access_level', 'user_avatar', 'display_name']
        }
      }
    },
    sequelize,
    modelName: 'User',
  });

  User.prototype.toSafeObject = function() {
    const { id, username } = this;
    return { id, username };
  };


  User.prototype.validatePassword = function(pw) {
    return bcrypt.compareSync(pw, this.password.toString());
  };


  User.getCurrentUser = async function(id) {
    return await User.scope('currentUser').findByPk(id);
  };


  User.getAllUsers = async function() {
    return await User.scope('allUsers').findAll();
  };


  User.login = async function({ username, password}) {

    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.eq]: {
          username
        }
      }
    });

    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }

  };


  User.createUser = async function({ username, email, password }) {

    const pwHash = bcrypt.hashSync(password);
    const user = await User.create({ username, email, password: pwHash });

    return await User.scope('currentUser').findByPk(user.id);
  };


  User.isFirstRun = async function() {

    return await User.scope('firstTimeCheck').findOne();

  };

  return User;
};