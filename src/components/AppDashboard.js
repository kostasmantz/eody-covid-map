import * as React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {SimpleMap} from './map/SimpleMap';
import Title from './Title';
import {TestSiteTable} from "./TestSiteTable";
import {DatePicker} from "./DatePicker";

const AppBar = MuiAppBar;
const mdTheme = createTheme();

class AppDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            selectedDate: new Date(),
            selectedPlace: null
        };

        this.handler = this.handler.bind(this);
    }

    handler(newDate) {
        console.log("Handler called");
        this.setState({
            selectedDate: newDate
        });
        this.callApiAndUpdateState();
    }

    componentDidMount() {
        this.callApiAndUpdateState();
    }


    callApiAndUpdateState() {
        if (!this.state.selectedDate) {
            return;
        }
        console.log("Calling API...");

        let from = new Date(this.state.selectedDate);
        from.setUTCHours(0, 0, 0);
        let to = new Date(this.state.selectedDate);
        to.setUTCHours(23, 59, 59);
        let apiString = "http://35.193.172.2:8080/api/places?from=" + from.toISOString() + "&to=" + to.toISOString();
        console.log(apiString);

        fetch(apiString,
            {
                method: "get",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, items, selectedDate, selectedPlace} = this.state;

        return (
            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline/>
                    <AppBar position="absolute">
                        <Toolbar
                            sx={{
                                pr: '24px'
                            }}
                        >
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{flexGrow: 1}}
                            >
                                Eody - Rapid Test Sites
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar/>
                        <Container maxWidth="xl" sx={{mt: 4, mb: 4}}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 450,
                                        }}
                                    >
                                        <Title>Rapid Test Sites</Title>
                                        <SimpleMap items={items}/>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            height: 450,
                                        }}
                                    >
                                        <DatePicker date={selectedDate} onDateChange={this.handler}/>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column', overflow: 'auto', height: '35vh'}}>
                                        <TestSiteTable items={items} selectedPlace={selectedPlace}/>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }
}

export default function Dashboard() {
    return <AppDashboard/>;
}