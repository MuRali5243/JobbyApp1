const SalType = props => {
  const {det, func} = props
  const {salaryRangeId, label} = det
  const onclicks = event => {
    func(event.target.value)
  }
  return (
    <li className="filter-item">
      <input type="radio" onClick={onclicks} value={salaryRangeId} />
      <label className="filter-lable">{label}</label>
    </li>
  )
}
export default SalType
