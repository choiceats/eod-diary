import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import Grid from 'material-ui/Grid'

import { fetchDiaries } from '../services/localStorage'

class DiaryList extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'LOAD_DIARIES',
      diaries: JSON.parse(fetchDiaries())
    })
  }

  render() {
    const { diaries } = this.props

    return (
      <Grid container>
        <ul>
          {diaries.map((d, i) => (
            <li key={i}>
              <Link to={`/diary/${d.id}`}>{d.description}</Link>
            </li>
          ))}
        </ul>
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          to="/diary/new"
          component={Link}
          style={{ position: 'fixed', right: 15, bottom: 15 }}
        >
          <AddIcon />
        </Button>
      </Grid>
    )
  }
}

DiaryList.defaultProps = {
  diaries: []
}

const mapStateToProps = ({ diaries }) => ({ diaries })

export default connect(mapStateToProps)(DiaryList)
