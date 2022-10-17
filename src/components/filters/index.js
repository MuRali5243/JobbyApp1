import FilterSal from '../filterSalItem'

import FilterEmp from '../filterEmpType'
import './index.css'

const Filters = props => {
  const {sal, emp, empfun, salfun} = props
  console.log(sal)

  return (
    <div className="filter-cont">
      <hr className="line" />

      <h1>Type of Employment</h1>
      <ul className="filter-list">
        {emp.map(each => (
          <FilterEmp func={empfun} key={each.id} det={each} />
        ))}
      </ul>
      <hr className="line" />
      <h1>Salary Range</h1>
      <ul className="filter-list">
        {sal.map(each => (
          <FilterSal func={salfun} key={each.id} det={each} />
        ))}
      </ul>
    </div>
  )
}

export default Filters
