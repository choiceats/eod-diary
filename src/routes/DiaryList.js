import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class DiaryList extends React.Component {
	render() {
		const {
			diaries
		} = this.props;

		return <ul>
			{diaries.map((d, i) => (
				<li key={i}><Link to={`/diary/${d.id}`}>{d.description}</Link></li>	
			))}
			</ul>
	}
}

DiaryList.defaultProps = {
	diaries: []
}

const mapStateToProps = ({diaries}) => ({ diaries })

export default connect(mapStateToProps)(DiaryList)
