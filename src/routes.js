import HomePage from './components/HomePage';
import DashboardPage from './containers/DashboardPage';
import LoginPage from './containers/LoginPage';
import SignUpPage from './containers/SignUpPage';
import ProfilePage from './containers/ProfilePage';
import Auth from './modules/Auth';

const routes = {
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/profile/:id',
      component: ProfilePage
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        replace('/');
      }
    }
  ]
};

export default routes;
