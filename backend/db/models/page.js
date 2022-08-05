'use strict';


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Page.init({
    page_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    page_content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Page',
  });


  Page.getPages = async function() {

    return await Page.findAll();

  };


  Page.createPage = async function(name) {

    const page = await Page.create({ name });

    return await Page.findByPk(page.id);
  };


  Page.editPage = async function({ id, name, page_content, enabled }) {

    const page = await Page.findByPk(id);

    return await page.update({
      name,
      page_content, 
      enabled
    });
  };


  Page.deletePage = async function(id) {

    const page = await Page.findByPk(id);

    return await page.destroy();

  };


  return Page;
};