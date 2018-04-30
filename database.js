const Sequelize = require('sequelize')

const db = new Sequelize('postgres://localhost/comments-db')

const Post = db.define('post', {
  title: Sequelize.STRING,
  description: Sequelize.STRING,
})

const Comment = db.define('comment', {
  subject: Sequelize.STRING,
  text: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      // We can add some extra validators here...
      // http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations
    }
  },
})

Post.hasMany(Comment)
Comment.belongsTo(Post)

async function sync() {
  await Post.sync({ force: true })
  console.log('successfully synced posts')
  await Comment.sync({ force: true })
  console.log('successfully synced comments')
  await db.close()
  console.log('closed the db connection')
}

sync()
