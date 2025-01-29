import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import type { DeleteTaskMutationVariables } from 'types/graphql'

import { routes } from '@redwoodjs/router'

import ButtonI from 'src/components/Buttons/ButtonI'
import LinkButton from 'src/components/Buttons/LinkButton'
import StackButton from 'src/components/Buttons/StackButton'
import { Task } from 'src/types/Task'

interface TaskTableProps {
  tasks: Task[]
  onDeleteTask: (id: DeleteTaskMutationVariables['id']) => void
}

export default function TaskTable({ tasks, onDeleteTask }: TaskTableProps) {
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
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell align="center" component="th" scope="row">
                {task.id}
              </TableCell>
              <TableCell align="center">{task.description}</TableCell>
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

                  <LinkButton
                    variant={'contained'}
                    to={routes.editTask({ id: task.id })}
                    title={'Edit'}
                  />

                  <ButtonI
                    variant={'contained'}
                    title={'Delete'}
                    color={'error'}
                    onClick={() => onDeleteTask(task.id)}
                  />
                </StackButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
