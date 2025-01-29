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

export default function ButtonI({ title, ...rest }: ButtonIProps) {
  return <Button {...rest}>{title}</Button>
}
