
exports.up = async function(knex) {
  await knex.schema
  .createTable('projects', table => {
      table.increments('project_id'),
      table.string('project_name').notNullable()
      table.string('project_description')
      table.integer('project_completed').defaultTo(0)
  })
  .createTable('resources', table => {
    table.increments('resource_id'),
    table.string('resource_name').notNullable().unique()
    table.string('resource_description')
})
.createTable('tasks', table => {
    table.increments('task_id'),
    table.string('task_description').notNullable()
    table.string('task_notes')
    table.integer('task_completed').defaultTo(0)
    table.integer('project_id').notNullable()
    .references('project_id')
    .inTable('projects')
    .onDelete('restrict')
    .onUpdate('restrict')
})
.createTable('project_resources', table => {
    table.increments()
    table.integer('project_id')
    .references('project_id')
    .inTable('projects')
    .onDelete('restrict')
    .onUpdate('restrict')

    table.integer('resource_id')
    .references('resource_id')
    .inTable('resources')
    .onDelete('restrict')
    .onUpdate('restrict')
})
};

exports.down = async function(knex) {
    await knex.schema
  .dropTableIfExists('project_resources')
  .dropTableIfExists('tasks')
  .dropTableIfExists('resources')
  .dropTableIfExists('projects')
};
