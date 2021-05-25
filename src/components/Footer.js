import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(3),
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <div id="header">
            <Typography className={classes.footer} variant="body1" color="textSecondary" gutterBottom>
                Mady by Lukas Machegger
            </Typography>

        </div>
    );
};

export default Footer;