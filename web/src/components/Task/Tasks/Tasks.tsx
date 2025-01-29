import { useState } from 'react'

import { closestCorners, DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import type {
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
  FindTasks,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Task/TasksCell'
import TaskTable from 'src/components/Task/TaskTable/TaskTable'

const DELETE_TASK_MUTATION: TypedDocumentNode<
  DeleteTaskMutation,
  DeleteTaskMutationVariables
> = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`

const TasksList = ({ tasks }: FindTasks) => {
  const [ttasks, setTasks] = useState([...tasks])
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteTaskMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } })
    }
  }

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

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <TaskTable tasks={ttasks} onDeleteTask={onDeleteClick} />
    </DndContext>
  )
}

export default TasksList
