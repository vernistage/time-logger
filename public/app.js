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
