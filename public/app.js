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
        <EditableTimer
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

// child of immediate child compononent
const EditableTimer = React.createClass({
  render: function () {
    // checking props passed from EditableTimerList
    if (this.props.editFormOpen) {
      return (
        // inheriting props from editabletimer set by editabletimerlist
        <TimerForm
        // 'this' is container class, not timerform
          title={this.props.title}
          project={this.props.project}
        />
      );
    } else {
      return (
        <Timer
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      );
    }
  },
});
