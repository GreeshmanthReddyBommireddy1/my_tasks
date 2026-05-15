import './index.css'

const Tags = props => {
  const {tasks} = props

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>
      {tasks.length === 0 ? (
        <p>No Tasks Added Yet</p>
      ) : (
        <ul className="tasks-list">
          {tasks.map(each => (
            <li className="task-item" key={each.id}>
              <p>{each.name}</p>
              <p className="tag-pill">{each.purpose}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tags
