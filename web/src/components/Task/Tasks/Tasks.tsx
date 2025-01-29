import { useEffect, useState } from 'react'

import { closestCorners, DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { Checkbox } from '@mui/material'
import type { FindTasks } from 'types/graphql'

import TaskTable from 'src/components/Task/TaskTable/TaskTable'

const TasksList = ({ tasks }: FindTasks) => {
  const [filterTasks, setFilterTasks] = useState<boolean>(false)
  const [ttasks, setTasks] = useState(tasks)

  const getTaskPos = (id) => ttasks.findIndex((task) => task.id === id)

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id === over.id) return

    setTasks((prev) => {
      const originalPos = getTaskPos(active.id)
      const newPos = getTaskPos(over.id)

      return arrayMove(prev, originalPos, newPos)
    })
  }

  useEffect(() => {
    if (filterTasks) {
      const filteredTasks = ttasks.filter((task) => task.status === true)
      setTasks(filteredTasks)
    } else {
      setTasks(tasks)
    }
  }, [filterTasks, ttasks, tasks])

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <h5>Filter by completed tasks</h5>
      <Checkbox onClick={() => setFilterTasks((prev) => !prev)} />

      <TaskTable tasks={ttasks} />
    </DndContext>
  )
}

export default TasksList
