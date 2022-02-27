import * as React from 'react';
import Title from "./Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TableCell, TextField} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import {Autocomplete} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


export class TestSiteTable extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Title>Rapid Test Sites ({this.props.items.length > 0 ? this.props.items.length : '-'})</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="body1" component="div" display="right">
                                    Places
                                </Typography>
                            </TableCell>
                            <TableCell sx={{display: "flex", justifyContent: "flex-end"}}>
                                <Typography variant="body1" component="div" display="right">
                                    Filters:
                                </Typography>
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={this.props.items}
                                    sx={{width: 500}}
                                    getOptionLabel={(option) => option.title}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props} key={option.id}>
                                            {option.title}
                                        </Box>
                                    )}
                                    renderInput={(params) => <TextField {...params} label="Place"/>}
                                />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.items.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell colSpan={2}>{row.title}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}
