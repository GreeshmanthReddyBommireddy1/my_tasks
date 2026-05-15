import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Tags from '../Tags'
import './index.css'

const tagsList = [
  {optionId: 'HEALTH', displayText: 'Health'},
  {optionId: 'EDUCATION', displayText: 'Education'},
  {optionId: 'ENTERTAINMENT', displayText: 'Entertainment'},
  {optionId: 'SPORTS', displayText: 'Sports'},
  {optionId: 'TRAVEL', displayText: 'Travel'},
  {optionId: 'OTHERS', displayText: 'Others'},
]

class Task extends Component {
  state = {
    listy: [],
    task: '',
    tag: tagsList[0].optionId,
    activeFilter: '',
  }

  changeTask = event => {
    this.setState({task: event.target.value})
  }

  changeDrop = event => {
    this.setState({tag: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {task, tag} = this.state
    if (task.trim() === '' || tag.trim() === '') return

    const selectedTag = tagsList.find(each => each.optionId === tag)

    const newItem = {
      id: uuidv4(),
      name: task,
      purpose: selectedTag.displayText,
      tagId: tag,
    }

    this.setState(prevState => ({
      listy: [...prevState.listy, newItem],
      task: '',
      tag: tagsList[0].optionId,
    }))
  }

  changeFilter = optionId => {
    this.setState(prevState => ({
      activeFilter: prevState.activeFilter === optionId ? '' : optionId,
    }))
  }

  render() {
    const {listy, task, tag, activeFilter} = this.state

    const filteredList =
      activeFilter === ''
        ? listy
        : listy.filter(each => each.tagId === activeFilter)

    return (
      <div className="task-container">
        <div className="task">
          <form onSubmit={this.submitForm}>
            <h1>Create a task!</h1>

            <label htmlFor="text">Task</label>
            <input
              placeholder="Enter the task here"
              type="text"
              id="text"
              onChange={this.changeTask}
              value={task}
            />

            <label htmlFor="tags">Tags</label>
            <select onChange={this.changeDrop} id="tags" value={tag}>
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>

            <button type="submit">Add Task</button>
          </form>
        </div>

        <div className="tags">
          <div className="tags-list">
            <h1>Tags</h1>
            <ul className="tags-ul">
              {tagsList.map(each => (
                <li
                  key={each.optionId}
                  className={`tag-item ${
                    activeFilter === each.optionId ? 'active' : ''
                  }`}
                  onClick={() => this.changeFilter(each.optionId)}
                >
                  <button type="button">{each.displayText}</button>
                </li>
              ))}
            </ul>
          </div>

          <Tags tasks={filteredList} />
        </div>
      </div>
    )
  }
}

export default Task
