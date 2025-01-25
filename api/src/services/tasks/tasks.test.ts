import type { Task } from '@prisma/client'
import { tasks, task, createTask, updateTask, deleteTask } from './tasks'
import type { StandardScenario } from './tasks.scenarios'

describe('[e2e] tasks', () => {
  scenario('[e2e] returns all tasks', async (scenario: StandardScenario) => {
    const result = await tasks()

    expect(result.length).toEqual(Object.keys(scenario.task).length)
  })

  scenario('[e2e] returns a single task', async (scenario: StandardScenario) => {
    const result = await task({ id: scenario.task.one.id })

    expect(result).toEqual(scenario.task.one)
  })

  scenario('[e2e] creates a task', async () => {
    const result = await createTask({
      input: { description: 'String', status: false },
    })

    expect(result.description).toEqual('String')
    expect(result.status).toEqual(false)
  })

  scenario('[e2e] updates a task', async (scenario: StandardScenario) => {
    const original = (await task({ id: scenario.task.one.id })) as Task
    const result = await updateTask({
      id: original.id,
      input: { description: 'String2' },
    })

    expect(result.description).toEqual('String2')
  })

  scenario('[e2e] updates a task status', async (scenario: StandardScenario) => {
    const original = (await task({ id: scenario.task.one.id })) as Task
    const result = await updateTask({
      id: original.id,
      input: { description: original.description, status: !original.status },
    })

    expect(result.status).toEqual(!original.status)
  })

  scenario('[e2e] deletes a task', async (scenario: StandardScenario) => {
    const original = (await deleteTask({ id: scenario.task.one.id })) as Task
    const result = await task({ id: original.id })

    expect(result).toEqual(null)
  })
})
