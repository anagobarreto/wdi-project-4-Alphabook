import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard';

class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      statuses: []
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log(xhr.response);
        this.setState({
          statuses: xhr.response
        });
      }
  });
  xhr.send();
}

/**
 * Render the component.
 */
render() {
  return (<Dashboard statuses={this.state.statuses} />);
}

}

export default DashboardPage;
