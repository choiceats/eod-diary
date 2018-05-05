import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom'

import { login } from './services/firebase'
import browserHistory from './services/history'
import { createAppStore } from './store'
import Navbar from './components/Navbar'
import DiaryList from './routes/DiaryList'
import Diary from './routes/Diary'
import NewDiaryForm from './routes/NewDiaryForm'
import { setItem, fetchDiaries } from './services/diaryApi'

import './App.css'

export function seedDiaries() {
  const diaries = fetchDiaries()

  if (diaries.length === 0) {
    const seed = [
      {
        description: 'work',
        dateCreated: '2018-05-01',
        id: '1',
        entries: ['Today I did some work', 'Today I did some work2']
      },
      {
        description: 'personal',
        dateCreated: '2018-05-02',
        id: '2',
        entries: ['Today life is awesome', 'Today life is awesome2']
      }
    ]

    setItem('diaries', JSON.stringify(seed))
  }
}

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = { user: null }
    this.history = browserHistory
    this.store = createAppStore()
  }

  componentDidMount() {
    seedDiaries()
    login(user => this.setState({ user }))
  }

  render() {
    const { user } = this.state

    if (user === null) {
      return <div>Not Logged in</div>
    }

    return (
      <div className="App">
        <Provider store={this.store}>
          <Router history={this.history}>
            <React.Fragment>
              <Navbar />
              <Route exact path="/" component={DiaryList} />
              <Switch>
                <Route exact path="/diary/new" component={NewDiaryForm} />
                <Route exact path="/diary/:diaryId" component={Diary} />
              </Switch>
            </React.Fragment>
          </Router>
        </Provider>
      </div>
    )
  }
}

export default App
