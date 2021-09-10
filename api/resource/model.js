// build your `Resource` model here
const db = require('../../data/dbConfig')

const insert = async(resource) => {
let id = await db('resources')
.insert(resource)
let result = await db('resources').where('resource_id', id).first()
return result
}

const getAll = async () => {
    return await db('resources')
}

module.exports = {insert, getAll}