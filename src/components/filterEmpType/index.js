const EmpType = props => {
  const {det, func} = props
  const {employmentTypeId, label} = det
  const onclickk = event => {
    func(event.target.value)
  }
  return (
    <li className="filter-item">
      <input type="checkbox" onClick={onclickk} value={employmentTypeId} />
      <label className="filter-lable">{label}</label>
    </li>
  )
}
export default EmpType
