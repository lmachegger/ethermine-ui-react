import Typography from '@material-ui/core/Typography';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
}));

const Header = () => {
    const classes = useStyles();
    return (
        <div id="header">
            <Typography className={classes.header} variant="h4" gutterBottom>
                Ethermine Stats
            </Typography>

        </div>
    );
};

export default Header;