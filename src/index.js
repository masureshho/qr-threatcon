import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { IntlProvider } from 'react-intl';
import routesContainer from './routes';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { AppContainer } from 'react-hot-loader';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import red from '@material-ui/core/colors/red';
import { trigger } from 'redial';
import overrides from './constants/MaterialUIOveride';
import ReduxToastr from 'react-redux-toastr';


const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = routesContainer(store);
const { dispatch } = store;

const matchAndRender = (location) => {
  match({ routes, location, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.error(error);
    }
    if (renderProps) {
      const { components } = renderProps;
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        store,
        dispatch
      };
      trigger('fetch', components, locals);
    }
  });
};

history.listen((location) => {
  matchAndRender(location);
});
// For Initial load
matchAndRender(history.getCurrentLocation());

const theme = createMuiTheme({
  palette: createPalette({
    primary: {
      ...red,
      500: '#DF5A3E',
    },
  }),
  overrides,
});

render(
  <AppContainer>
    <IntlProvider locale="en">
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div>
            <Router history={history} onUpdate={() => window.scrollTo(0, 0)}>
              {routes}
            </Router>
            <ReduxToastr
              timeOut={5000}
              newestOnTop={false}
              preventDuplicates
              position="bottom-center"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar
            />
          </div>
        </Provider>
      </MuiThemeProvider>
    </IntlProvider>
  </AppContainer>,
  document.getElementById('app')
);
if (module.hot) {
  module.hot.accept();
}
