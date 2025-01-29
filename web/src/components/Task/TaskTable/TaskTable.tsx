import * as React from 'react'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { routes } from '@redwoodjs/router'

import LinkButton from 'src/components/Buttons/LinkButton'
import StackButton from 'src/components/Buttons/StackButton'
import Editor from 'src/components/Editor/Editor'
import { Task } from 'src/types/Task'

import TaskTableRow from './TaskTableRow'

interface TaskTableProps {
  tasks: Task[]
}

export default function TaskTable({ tasks }: TaskTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Created at</TableCell>
            <TableCell align="center">Updated at</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskTableRow task={task} key={task.id}>
                <TableCell align="center" component="th" scope="row">
                  {task.id}
                </TableCell>
                <TableCell align="center">
                  {
                    <Editor
                      autoFocus={false}
                      defaultValue={task.description}
                      onEditorUpdate={() => null}
                      key={task.id}
                    />
                  }
                </TableCell>
                <TableCell align="center">
                  {task.status === true ? 'Completed' : 'Incomplete'}
                </TableCell>
                <TableCell align="center">
                  {new Date(task.createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(task.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell align="left">
                  <StackButton direction={'row'} spacing={2}>
                    <LinkButton
                      variant={'contained'}
                      to={routes.task({ id: task.id })}
                      title={'Details'}
                    />
                  </StackButton>
                </TableCell>
              </TaskTableRow>
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
