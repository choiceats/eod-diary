import React, {Component} from 'react'
import {arrayOf, string} from 'prop-types'
import {connect} from 'react-redux'

function fetchEntries() {
	return [
		"0The quick brown fox jumped over the lazy dogs.",
		"1he quick brown fox jumped over the lazy dogs.",
		"2he quick brown fox jumped over the lazy dogs.",
		"3he quick brown fox jumped over the lazy dogs.",
	]
}

class Diary extends Component {
	componentDidMount() {
		

		this.props.dispatch({
			type: 'LOAD_ENTRIES',
			payload: {
				diaryId: this.props.match.params.diaryId,
				entries: fetchEntries()
			}
		});
	}

	render() {
		return <div>
			{this.props.entries.map((e, i) => (
				<p key={i}>{e}</p>
			))}
			</div>
	}
}

Diary.propTypes = {
	entries: arrayOf(string).isRequired
}

const mapStateToProps = (state, props) => {
	const {diaries} = state;

	const diaryId = props.match.params.diaryId;

	const diary = diaries.find(d => d.id === diaryId)

	const entries = (diary && diary.entries) || []

	return {entries}
}

export default connect(mapStateToProps)(Diary)
