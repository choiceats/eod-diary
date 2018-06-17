import React, { Component } from 'react'
import { arrayOf, string } from 'prop-types'
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'

import Navbar from '../components/Navbar'

export class Diary extends Component {
  constructor(props) {
    super(props)
    this.state = { diary: null, entries: [] }
  }

  componentDidMount() {
    const { match } = this.props
    const diaryId = match.params.diaryId
    const fbDb = firebase.database()
    this.diaryRef = fbDb.ref(`diaries/${diaryId}`)
    this.diaryRef.on('value', snap => {
      this.setState({ diary: snap.val() })
    })

    this.entriesRef = fbDb.ref(`entries/${diaryId}`)
    this.entriesRef.on('value', snap => {
      this.setState({ entries: snap.val() })
    })
  }

  componentWillUnmount() {
    this.diaryRef.off('value')
  }

  render() {
    const { match } = this.props
    const { diaryId } = match.params
    const { entries, diary } = this.state

    return (
      <React.Fragment>
        <Navbar title={diary && diary.name} />
        {entries ? (
          <div>
            {Object.keys(entries).map(entryKey => (
              <p key={entryKey}>{entries[entryKey].entry}</p>
            ))}
          </div>
        ) : (
          <div>No entries found</div>
        )}
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          to={`/diary/${diaryId}/entry/new`}
          component={Link}
          style={{ position: 'fixed', right: 15, bottom: 15 }}
        >
          <AddIcon />
        </Button>
      </React.Fragment>
    )
  }
}

Diary.propTypes = {
  entries: arrayOf(string),
  name: string
}

export default Diary
