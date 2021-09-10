// build your `Task` model here

const db = require('../../data/dbConfig')

const insert = async(task) => {
let id = await db('tasks')
.insert(task)
let result = await db('tasks').where('task_id', id).first()
if(result.task_completed === 0) {
    result.task_completed = false
}
else{
    result.task_completed = true
}

return result
}

const getAll = async () => {
    let taskarr =  await db('tasks as t')
    .leftJoin('projects as p', 't.project_id', 'p.project_id')
    .select('t.*', 'p.project_name', 'p.project_description')
    let newarr = taskarr.map(element => {
        if(element.task_completed === 1) {
            element.task_completed = true
            return element
        }
        else{
            element.task_completed = false
            return element
        }
    });
    return newarr
}

module.exports = {insert, getAll}