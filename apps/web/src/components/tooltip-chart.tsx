type Props = {
  value: string
  label: string
}

export const TooltipChart = ({ value, label }: Props) => {
  return (
    <div className="bg-base-bg border flex  bg-base-base rounded p-2 shadow">
      <p className="text-base-text font-semibold">{label}:&nbsp;</p>
      <p className="text-base-rose">{value}</p>
    </div>
  )
}
