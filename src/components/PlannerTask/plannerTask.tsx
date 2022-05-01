/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import { ChangeEvent, useState } from 'react';
import './plannerTask.scss';

type PlannerTaskProps = {
  index: number,
  title: string,
  priority: '1'|'2'|'3';
  callParent: (index: number, changeTitle: boolean, title: string, selfDestroy: boolean) => void
}

const PlannerTask = ({
  index, title, priority, callParent,
}: PlannerTaskProps) => {
  const [isDone, setIsDone] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [oldTitle, setOldTitle] = useState(title);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const priorityText = priority === '1' ? 'LOW PRIORITY'
    : priority === '2' ? 'MEDIUM PRIORITY'
      : priority === '3' ? 'HIGH PRIORITY' : '';

  const priorityColor = priority === '1' ? 'light-green'
    : priority === '2' ? 'light-yellow'
      : priority === '3' ? 'light-red' : '';

  const priorityTextColor = priority === '1' ? 'green'
    : priority === '2' ? 'yellow'
      : priority === '3' ? 'red' : '';

  return (
    <div
      className={`plannerTask ${priorityColor}`}
    >
      <div className="plannerTask__flex-justify">
        <p className={`plannerTask__priority ${priorityTextColor}`}>
          {priorityText}
        </p>

        <div className="plannerTask__flex">
          <button
            className="plannerTask__edit-button"
            onClick={() => {
              isBeingEdited ? callParent(index, true, title, false) : null;
              setIsBeingEdited(!isBeingEdited);
              setOldTitle(newTitle);
            }}
          >
            {isBeingEdited ? 'Save' : 'Edit'}
          </button>
          {isBeingEdited
            ? (
              <button
                className="plannerTask__edit-button"
                onClick={() => {
                  isBeingEdited ? callParent(index, true, title, false) : null;
                  setIsBeingEdited(!isBeingEdited);
                  setNewTitle(oldTitle);
                }}
              >
                Cancel
              </button>
            )
            : null}
          <button
            className="plannerTask__destroy-button"
            onClick={() => {
              setNewTitle(oldTitle);
              callParent(index, false, title, true);
            }}
          >
            X
          </button>
        </div>
      </div>

      <div className="plannerTask__flex">
        <button
          className="plannerTask__done-check"
          onClick={() => {
            setIsDone(!isDone);
            callParent(index, false, title, false);
          }}
        >
          {isDone ? '✓' : 'x'}
        </button>
        {isBeingEdited
          ? (
            <input
              className="plannerTask__input"
              value={newTitle}
              onChange={(e:ChangeEvent<HTMLInputElement>) => {
                setNewTitle(e.target.value);
                callParent(index, true, e.target.value, false);
              }}
              placeholder="Write Task Name Here"
            />
          )
          : (
            <p
              className="plannerTask__text"
            >
              {oldTitle}
            </p>
          )}
      </div>

      <button
        className="plannerTask__edit-button"
        onClick={() => {
          isBeingEdited ? callParent(index, true, title, false) : null;
          setIsBeingEdited(!isBeingEdited);
          setOldTitle(newTitle);
        }}
      >
        {isBeingEdited ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default PlannerTask;
