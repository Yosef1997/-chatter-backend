const db = require('../helpers/db')

exports.createChat = (data = {}) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    INSERT INTO message
    (${Object.keys(data).join()})
    VALUES
    (${Object.values(data).map(item => `'${item}'`).join(',')})
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.deleteChat = (receiver, message, sender) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
  DELETE FROM message WHERE receiver=${receiver} AND message LIKE "%${message}%" AND sender=${sender}
  `, (err, res, field) => {
      if (err) reject(err)
      // console.log(field)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.getAllChat = (id) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT m.id, u.id as idReceiver, u.name, u.picture, m.message from message m
    INNER JOIN users u ON u.id=receiver
    WHERE sender=${id}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}

exports.detailChat = (id, sender) => {
  return new Promise((resolve, reject) => {
    const query = db.query(`
    SELECT * from message WHERE receiver=${id} AND sender=${sender}
    `, (err, res, field) => {
      if (err) reject(err)
      resolve(res)
    })
    console.log(query.sql)
  })
}
