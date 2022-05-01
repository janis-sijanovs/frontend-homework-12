/* eslint-disable no-unused-expressions */
import {
  ChangeEvent, useState,
} from 'react';
import Task from '../PlannerTask/plannerTask';
import './planner.scss';

const tasks: {
  title: string;
  isDone: boolean;
  priority: '1'|'2'|'3';
}[] = [];

const Planner = () => {
  const [taskArray, setTaskArray] = useState(tasks);

  const [showHighPriority, setShowHighPriority] = useState(true);
  const [showMediumPriority, setShowMediumPriority] = useState(true);
  const [showLowPriority, setShowLowPriority] = useState(true);

  const [showFinished, setShowFinished] = useState(true);
  const [showUnfinished, setShowUnfinished] = useState(true);

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority]: ['1'|'2'|'3', any] = useState('1');

  const [darkMode, setDarkMode] = useState(false);

  const handleCallback = (index: number, changeTitle: boolean, title: string, deleteSelf :boolean) => {
    const newArray = [...taskArray];
    changeTitle
      ? newArray[index].isDone = !newArray[index].isDone
      : newArray[index].title = title;

    const result = [...newArray]
      .slice(0, index)
      .concat([...newArray]
        .slice(index + 1));
    deleteSelf ? setTaskArray(result) : setTaskArray(newArray);
  };

  const sortedArr = [...taskArray]
    .sort((first, second) => {
      if (first.priority > second.priority) {
        return -1;
      }
      if (first.priority < second.priority) {
        return 1;
      }
      return 0;
    });
    // .filter(({ isDone }) => (
    //   showFinished && showUnfinished ? true
    //   : showFinished ? isDone
    //   : showUnfinished ? !isDone
    //   : false
    // )
    // .filter(({ priority }) => (
    //   !showHighPriority && priority === '3' ? false
    //   : !showMediumPriority && priority === '2' ? false
    //   : !showLowPriority && priority === '1' ? false : true
    // )

  return (
    <div
      className={darkMode ? 'planner dark-mode' : 'planner'}
    >
      <button
        className="planner__button"
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        Dark Mode
      </button>

      <div className="planer__adding-box">

        <input
          className="planner__input"
          value={newTaskText}
          onChange={(e:ChangeEvent<HTMLInputElement>) => setNewTaskText(e.target.value)}
          placeholder="Add New Task.."
        />

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="planner__select">
          <p>Priority:</p>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <select
            name="priority"
            onChange={(e:ChangeEvent<HTMLSelectElement>) => setNewTaskPriority(e.target.value)}
            value={newTaskPriority}
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </label>

        <button
          className="planner__button"
          onClick={() => {
            setTaskArray([...taskArray].concat([
              {
                title: newTaskText,
                isDone: false,
                priority: newTaskPriority,
              },
            ]));
            setNewTaskText('');
          }}
        >
          ADD
        </button>

      </div>

      {sortedArr
        .map((task) => (
          <Task
            key={taskArray.indexOf(task)}
            index={taskArray.indexOf(task)}
            title={task.title}
            priority={task.priority}
            callParent={handleCallback}
          />
        ))}

      <div className="planner__button-flex">
        <button
          className="planner__button"
          onClick={() => {
            setShowHighPriority(!showHighPriority);
          }}
        >
          SHOW HIGH PRIORITY
        </button>
        <button
          className="planner__button"
          onClick={() => {
            setShowMediumPriority(!showMediumPriority);
          }}
        >
          SHOW MEDIUM PRIORITY
        </button>
        <button
          className="planner__button"
          onClick={() => {
            setShowLowPriority(!showLowPriority);
          }}
        >
          SHOW LOW PRIORITY
        </button>
      </div>

      <div className="planner__button-flex">
        <button
          className="planner__button"
          onClick={() => {
            setShowFinished(true);
            setShowUnfinished(true);
          }}
        >
          All
        </button>
        <button
          className="planner__button"
          onClick={() => {
            setShowUnfinished(!showUnfinished);
          }}
        >
          In Progress
        </button>
        <button
          className="planner__button"
          onClick={() => {
            setShowFinished(!showFinished);
          }}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Planner;
