import { ReactNode } from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TableRow } from '@mui/material'

import { Task } from 'src/types/Task'

interface TaskTableRowProps {
  task: Task
  key: number
  children: ReactNode
}

export default function TaskTableRow({ task, children }: TaskTableRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  return (
    <TableRow
      key={task.id}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {children}
    </TableRow>
  )
}
