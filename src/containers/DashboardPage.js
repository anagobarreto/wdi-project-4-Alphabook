import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statuses: []
    };
  }

  componentDidMount() {
    this.fetchLatestStatuses();

    this.timer = setInterval(() => {
      this.fetchLatestStatuses();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  fetchLatestStatuses() {
    Auth
      .fetch('/api/dashboard', {
        method: 'GET',
      })
      .then(statuses => {
        this.setState({statuses});
      });
  }

  render() {
    return <Dashboard statuses={this.state.statuses} />;
  }
}

export default DashboardPage;
