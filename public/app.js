// parent compononent
const TimersDashboard = React.createClass({
  render: function () {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          // immediate children
          <EditableTimerList />
          // TimersDashboard passing one prop down: isOpen
          <ToggleableTimerForm
            isOpen={true}
          />
        </div>
      </div>
    );
  },
});

// immediate child compononent
const EditableTimerList = React.createClass({
  render: function () {
    return (
      <div id='timers'>
        // immediate child
        // passing down props to each child
        <EditableTimer
          title='Learn React'
          project='Web Domination'
          elapsed='8986300'
          runningSince={null}
          editFormOpen={false}
        />
        <EditableTimerList
          title='Learn extreme ironing'
          project='World Domination'
          elapsed='3890985'
          runningSince={null}
          editFormOpen={true}
        />
      </div>
    );
  },
});
