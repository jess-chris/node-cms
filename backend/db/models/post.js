'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Post.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Post.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: { model: 'Users' },
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255]
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });


  Post.getPosts = async function() {

    return await Post.findAll();
  };


  Post.createPost = async function({ user_id, title, content}) {

    const post = await Post.create({ user_id, title, content });

    return await Post.findByPk(post.id);
  };


  Post.editPost = async function({ id, title, content }) {

    const post = await Post.findByPk(id);

    return await post.update({
      title,
      content
    });
  };


  Post.deletePost = async function(id) {

    const post = await Post.findByPk(id);

    return await post.destroy();
  };


  return Post;
};