import type { EditTaskById, UpdateTaskInput } from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

type FormTask = NonNullable<EditTaskById['task']>

interface TaskFormProps {
  task?: EditTaskById['task']
  onSave: (data: UpdateTaskInput, id?: FormTask['id']) => void
  error: RWGqlError
  loading: boolean
}

const TaskForm = (props: TaskFormProps) => {
  const onSubmit = (data: FormTask) => {
    props.onSave(data, props?.task?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormTask> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.task?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="description" className="rw-field-error" />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <CheckboxField
          name="status"
          defaultChecked={props.task?.status}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="status" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default TaskForm
