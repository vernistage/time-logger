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

// child component of editable timer
const TimerForm = React.createClass({
  render: function () {
    // check to see if title already exists
    const submitText = this.props.title ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label> Title </label>
              // passing down props from editable timer that came from ancestors
              <input type='text' defaultValue={this.props.title} />
            </div>
            <div className='field'>
              <label> Project </label>
              <input type='text' defaultValue={this.props.project} />
            </div>
            <div className='ui two bottom attached buttons'>
              <button className='ui basic blue button'>
              // variable defined above
                {submitText}
              </button>
              <button classNAme='ui basic red button'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

// immediate child but also 'wrapper component'
const ToggleableTimerForm = React.createClass({
  render: function () {
    if (this.props.isOpen) {
      return (
        // returning a child of its sibling
        <TimerForm />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon'>
          // addition icon as button
            <i className='plus icon'></i>
          </button>
        </div>
      );
    }
  },
});
