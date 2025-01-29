import Button from '@mui/material/Button'

interface ButtonIProps {
  title: string
  variant: 'text' | 'outlined' | 'contained'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  color:
    | 'error'
    | 'info'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
}

export default function ButtonI({ title, onClick, ...rest }: ButtonIProps) {
  return (
    <Button type={'button'} onClick={onClick} {...rest}>
      {title}
    </Button>
  )
}
