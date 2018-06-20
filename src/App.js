import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import { login } from './services/firebase'
import browserHistory from './services/history'
import { createAppStore } from './store'
import DiaryList from './routes/DiaryList'
import Diary from './routes/Diary'
import NewDiaryForm from './routes/NewDiaryForm'
import NewEntryForm from './routes/NewEntryForm'

import './App.css'
import { getCurrentUser } from './services/user'

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { user: null }
    this.history = browserHistory
    this.store = createAppStore()
  }

  componentDidMount() {
    login(() => this.setState({ user: getCurrentUser() }))
  }

  render() {
    const { user } = this.state

    if (user === null) {
      return null
    }

    return (
      <div className="App">
        <Provider store={this.store}>
          <React.StrictMode>
            <Router history={this.history}>
              <React.Fragment>
                <Route exact path="/" component={DiaryList} />
                <Switch>
                  <Route exact path="/diary/new" component={NewDiaryForm} />
                  <Route exact path="/diary/:diaryId" component={Diary} />
                  <Route
                    exact
                    path="/diary/:diaryId/entry/new"
                    component={NewEntryForm}
                  />
                </Switch>
              </React.Fragment>
            </Router>
          </React.StrictMode>
        </Provider>
      </div>
    )
  }
}

export default App
