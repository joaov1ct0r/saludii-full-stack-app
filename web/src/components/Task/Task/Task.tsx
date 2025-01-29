import type {
  DeleteTaskMutation,
  DeleteTaskMutationVariables,
  FindTaskById,
} from 'types/graphql'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ButtonI from 'src/components/Buttons/ButtonI'
import StackButton from 'src/components/Buttons/StackButton'
import { useWsContext } from 'src/contexts/wsContext'
import { checkboxInputTag, timeTag } from 'src/lib/formatters'

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

interface Props {
  task: NonNullable<FindTaskById['task']>
}

const Task = ({ task }: Props) => {
  const { sendTask } = useWsContext()
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      sendTask('task')
      navigate(routes.tasks())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteTaskMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Task {task.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{task.id}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{task.description}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{checkboxInputTag(task.status)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(task.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(task.updatedAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <StackButton direction={'row'} spacing={2}>
          <ButtonI
            variant={'contained'}
            title={'Edit'}
            color={'warning'}
            onClick={() => navigate(routes.editTask({ id: task.id }))}
          />
          <ButtonI
            variant={'contained'}
            title={'Delete'}
            color={'error'}
            onClick={() => onDeleteClick(task.id)}
          />
        </StackButton>
      </nav>
    </>
  )
}

export default Task
