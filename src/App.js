import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { login } from './services/firebase'
import { createAppStore } from './store'
import Navbar from './components/Navbar'
import DiaryList from './routes/DiaryList'
import Diary from './routes/Diary'

import logo from './logo.svg'
import './App.css'

function fetchDiaries() {
  return [
    {
      description: 'work',
      dateCreated: '2018-05-01',
      id: '1'
    },
    {
      description: 'personal',
      dateCreated: '2018-05-02',
      id: '2'
    }
  ]
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { user: null }
    this.store = createAppStore()
  }

  componentDidMount() {
    login(user => this.setState({ user }))
    this.store.dispatch({ type: 'LOAD_DIARIES', diaries: fetchDiaries() })
  }

  render() {
    const { user } = this.state

    if (user === null) {
      return <div>Not Logged in</div>
    }

    return (
      <div className="App">
        <Provider store={this.store}>
          <Router>
            <React.Fragment>
              <Navbar />
              <Route exact path="/" component={DiaryList} />
              <Route exact path="/diary/:diaryId" component={Diary} />
            </React.Fragment>
          </Router>
        </Provider>
      </div>
    )
  }
}

export default App
