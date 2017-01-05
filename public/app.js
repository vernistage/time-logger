/* parent compononent*/
const TimersDashboard = React.createClass({
  getInitialState: function () {
    return {
      timers: [
        {
          title: 'Practice squat',
          project: 'Gym Chores',
          id: uuid.v4(),
          elapsed: 5456099,
          runningSince: Date.now(),
        },
        {
          title: 'Bake squash',
          project: 'Kitchen Chores',
          id: uuid.v4(),
          elapsed: 1273998,
          runningSince: null,
        },
      ],
    };
  },
  render: function () {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          {/* immediate children */}
          <EditableTimerList
            timers={this.state.timers}
          />
          {/* TimersDashboard passing down: isOpen and timers as props
            STATE */}
          <ToggleableTimerForm
            isOpen={false}
          />
        </div>
      </div>
    );
  },
});

/* immediate child compononent*/
const EditableTimerList = React.createClass({
  render: function () {
    const timers = this.props.timers.map((timer) => (
      <EditableTimer
        key={timer.id}
        id={timer.id}
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
      />
    ));
    return (
      <div id='timers'>
        {timers}
      </div>
    );
  },
});

/* child of immediate child compononent*/
const EditableTimer = React.createClass({
  /* form starts off as closed STATE */
  getInitialState: function() {
    return {
      editFormOpen: false,
    };
  },
  render: function () {
    {/* checking props passed from EditableTimerList*/}
    if (this.state.editFormOpen) {
      return (
        /* inheriting props from editabletimer set by editabletimerlist */
        /* this is container class, not timerform */
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
        />
      );
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      );
    }
  },
});

/* child component of editable timer*/
const TimerForm = React.createClass({
  handleSubmit: function() {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.refs.title.value,
      project: this.refs.project.value,
    });
  },
  render: function () {
    /* check to see if title already exists*/
    const submitText = this.props.title ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label> Title </label>
              {/* passing down props from editable timer that came from ancestors*/}
              <input type='text' ref='title'
                defaultValue={this.props.title}
              />
            </div>
            <div className='field'>
              <label> Project </label>
              <input type='text' defaultValue={this.props.project} />
            </div>
            <div className='ui two bottom attached buttons'>
              <button
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
              {/* variable defined above*/}
                {submitText}
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
});

/* immediate child but also 'wrapper component'*/
const ToggleableTimerForm = React.createClass({
  /* STATE form is initially closed */
  getInitialState: function () {
    return {
      isOpen: false,
    };
  },
  handleFormOpen: function () {
    this.setState({ isOpen: true });
  },
  handleFormClose: function () {
    this.setState({ isOpen: false });
  },
  handleFormSubmit: function(timer) {
    this.props.onFormSubmit(timer);
    this.setState({ isOpen: false });
  },
  render: function () {
    if (this.state.isOpen) {
      return (
        /* returning a child of its sibling*/
        <TimerForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button
            className='ui basic button icon'
            onClick={this.handleFormOpen}
          >
            <i className='plus icon'></i>
          </button>
        </div>
      );
    }
  },
});

/* child of editable timer and sibling of timerform*/
const Timer = React.createClass({
  render: function () {
    /* probably pulling function from helpers*/
    const elapsedString = helpers.renderElapsedString(this.props.elapsed);
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
          {/* getting properties from editable timer which is getting them from list */}
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'>
              <i className='edit icon'></i>
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon'></i>
            </span>
          </div>
        </div>
        <div className='ui bottom attached blue basic button'>
          Start
        </div>
      </div>
    )
  }
})

/* BEGIN RENDERING */
ReactDOM.render(
  <TimersDashboard />,
  document.getElementById('content')
);
