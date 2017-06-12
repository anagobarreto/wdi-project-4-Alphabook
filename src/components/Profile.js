import Layout from './Layout.js';
import Status from './Status.js';
import React from 'react';

export default class Profile extends React.Component {
  render() {
    return <Layout>
        <h1> {this.props.user.name} </h1>
      {this.props.statuses.map(status => {
        return <Status key={status._id} {...status} user={this.props.user} />;
      })}
    </Layout>;
  }
}
