import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        marginBottom: 20
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    position: {
        marginLeft: 100
    }
});

export default function Simplecard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    let htmlDownload = props.data.html_url;
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Full Name of Repository :-
                    <a href={htmlDownload} target="_blank">
                        {props.data.full_name}
                    </a>
                    <StarIcon className={classes.position}> </StarIcon>
                    {props.data.watchers_count}
                </Typography>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Description of Repository :-  {props.data.description}
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                    Owner Name :-  {props.data.owner.login}
                </Typography>

                <Typography className={classes.pos} color="textSecondary">
                    Updated at :- <Moment format="h:mm a, DD MMMM YYYY">
                        {
                            props.data.updated_at
                        }
                    </Moment>
                </Typography>

            </CardContent>
        </Card>
    );
}