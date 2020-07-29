import React from 'react'

const Pagination = ({ page, setPage, total, pageSize }) => {
  const controls = Array(Math.ceil(total / pageSize)).fill(0)
  return (
    <div className="container mt-3 text-center">
      <div className="btn-group">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className={`btn btn-warning strong text-white border border-warning`}>&lt; Prev</button>
        {
          controls.map((_control, index) => {
            return <div onClick={() => setPage(index + 1)} className={`btn ${page === index+1 ? 'btn-outline-warning' : 'btn-warning text-white'}  strong border border-warning`} key={'control'+index}>{index + 1}</div>
          })
        }
        <button disabled={page === controls.length} onClick={() => setPage(page + 1)} className="btn btn-warning strong text-white border border-warning">Next &gt;</button>
      </div>
    </div>
  )
}

export default Pagination
