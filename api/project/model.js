// build your `Project` model here

const db = require('../../data/dbConfig')

const insert = async(project) => {
let id = await db('projects')
.insert(project)
let result = await db('projects').where('project_id', id).first()
if(result.project_completed === 0) {
    result.project_completed = false
}
else{
    result.project_completed = true
}

return result
}

const getAll = async () => {
    let projectarr =  await db('projects')
    let newarr = projectarr.map(element => {
        if(element.project_completed === 1) {
            element.project_completed = true
            return element
        }
        else{
            element.project_completed = false
            return element
        }
    });
    return newarr
}

module.exports = {insert, getAll}