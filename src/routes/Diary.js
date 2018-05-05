import React, { Component } from 'react'
import { arrayOf, string } from 'prop-types'
import { connect } from 'react-redux'
import { loadEntriesRequest, loadDiariesRequest } from '../store/actions'

export class Diary extends Component {
  componentDidMount() {
    const { match, name, dispatch, entries } = this.props
    const diaryId = match.params.diaryId

    if (name && !entries) {
      dispatch(loadEntriesRequest({ diaryId, name }))
    } else {
      dispatch(loadDiariesRequest())
    }
  }

  render() {
    return this.props.entries ? (
      <div>{this.props.entries.map((e, i) => <p key={i}>{e}</p>)}</div>
    ) : (
      <div>No entries found</div>
    )
  }
}

Diary.propTypes = {
  entries: arrayOf(string),
  name: string
}

export const mapStateToProps = (state, props) => {
  const { diaries } = state

  const diaryId = props.match.params.diaryId

  const { name, entries } = diaries.find(d => d.id === diaryId) || {}

  return { name, entries }
}

export default connect(mapStateToProps)(Diary)
