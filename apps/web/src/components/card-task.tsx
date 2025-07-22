import { Card } from '@iac/ui/card'
import { Typography } from '@iac/ui/typography'
import { Task } from '~/app/lib/models/task'

type Props = {
  data: Task
}

export const CardTask = (props: Props) => {
  return (
    <Card>
      <Typography.H4>{props.data.title}</Typography.H4>
    </Card>
  )
}
