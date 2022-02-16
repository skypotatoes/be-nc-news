const db = require('./db/connection')

exports.fetchTopics = () => {
  return db
    .query(
      `
    SELECT slug, description FROM topics
    `,
    )
    .then((results) => {
      return results.rows
    })
}

exports.changeVotes = (newVotes, id) => {
  //  console.log('You are here inside changeVotes')
  return db
    .query(
      `
        UPDATE articles 
        SET votes = votes + $1
        WHERE article_id = $2
        RETURNING *;
        `,
      [newVotes, id],
    ) //database query to update votes for the relevant article
    .then((result) => {
      //console.log(result.rows)
      return result.rows
    })
}