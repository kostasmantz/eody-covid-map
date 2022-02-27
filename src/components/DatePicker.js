import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import {LocalizationProvider, MobileDatePicker} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {Stack, styled, TextField} from "@mui/material";
import {format} from "date-fns";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: 'inherit',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

export class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dateValue: this.props.date
        };
    }

    changeDate(date) {
        this.setState({
            dateValue: date
        });
    }

    render() {
        return (
            <React.Fragment>
                <Title>Date</Title>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <Item elevation={0}>
                            <Typography component="p" variant="h5">
                                {format(this.state.dateValue, 'dd MMMM yyyy')}
                            </Typography></Item>
                        <Item elevation={0}>
                            <MobileDatePicker
                                label="Choose Day"
                                value={this.state.dateValue}
                                onChange={(newValue) => {
                                    this.changeDate(newValue);
                                    this.props.onDateChange(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                date={this.state.dateValue}/></Item>
                    </Stack>
                </LocalizationProvider>

            </React.Fragment>
        );
    }
}