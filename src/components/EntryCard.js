import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import moment from 'moment'

const styles = {
  card: {
    minWidth: 275,
    margin: 5
  },
  dateTitle: {
    fontSize: 12
  },
  entryText: {}
}

const EntryCard = ({ classes, entryKey, entry }) => {
  const dateStr = moment(entry.created).format('MMM Do YYYY HH:mm')
  return (
    <Card key={entryKey} className={classes.card}>
      <CardContent>
        <Typography className={classes.dateTitle} color="textSecondary">
          {dateStr}
        </Typography>
        <div dangerouslySetInnerHTML={{ __html: entry.rawHTML }} />
      </CardContent>
    </Card>
  )
}

export default withStyles(styles)(EntryCard)
