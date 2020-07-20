import React, { useEffect, useCallback } from 'react';
import 'date-fns';
import { useForm } from "react-hook-form";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AsyncAutocomplete from '../form/async-autocomplete.component';
import Api from '../../common/api';

export default function SearchFormComponent({ type, onSearch, onReset }) {

    const aWeekAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
    const now = new Date();

    const [selectedDateFrom, setSelectedDateFrom] = React.useState(aWeekAgo);
    const handleChangeDateFrom = (date) => {
        setSelectedDateFrom(date);

        if(date)
            setValue("infoDateFrom", Api.dateToYMD(date));
        else
            setValue("infoDateFrom", "");
    };

    const [selectedDateTo, setSelectedDateTo] = React.useState(now);
    const handleChangeDateTo = (date) => {
        setSelectedDateTo(date);

        if(date)
            setValue("infoDateTo", Api.dateToYMD(date));
        else
            setValue("infoDateTo", "");
    };

    const onSubmit = useCallback(data => {
        console.log(data);

        onSearch(data);

    }, [type])

    const defaultFormValues = {
        web_page: [],
        country: [],
        language: [],
        keywords: [],
        infoDateFrom: Api.dateToYMD(aWeekAgo),
        infoDateTo: Api.dateToYMD(now)
    };

    const { register, handleSubmit, setValue, reset } = useForm({
        defaultValues: defaultFormValues
    });

    const onResetClicked = (event) => {

        setSelectedDateFrom(aWeekAgo);
        setSelectedDateTo(new Date());

        //clear auto-complete
        const clearButtonsElements = document.getElementsByClassName("MuiAutocomplete-clearIndicator");
        for(const buttonElement of clearButtonsElements) {
            buttonElement.click();
        }
        
        setTimeout(function() {
            const searchFormElement = document.getElementById("search-form");
            searchFormElement.reset();
            searchFormElement.click();
        }, 100);

        reset(defaultFormValues);

        onReset();
    };

    useEffect(() => {

        register({ name: "web_page"  });
        register({ name: "country" });
        register({ name: "language" });
        register({ name: "keywords" });
        register({ name: "infoDateFrom" });
        register({ name: "infoDateTo" });

    }, [register])

    return (
        <form id="search-form" onSubmit={handleSubmit(onSubmit)}>
            <Box
                boxShadow={3}
                textAlign="left"
                m={3}
                p={2}
            >

                <Typography variant="h5" gutterBottom >
                    Search
                    </Typography>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="infoDateFrom"
                            name="infoDateFrom"
                            label="Info date from"
                            onChange={handleChangeDateFrom}
                            value={selectedDateFrom}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="info-date-to"
                            label="Info date to"
                            name="infoDateTo"
                            onChange={handleChangeDateTo}
                            value={selectedDateTo}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                        <AsyncAutocomplete
                            name="web_page"
                            collectionName="webpages"
                            id="web_page"
                            style={{ width: 300 }}
                            openOnFocus
                            fullWidth
                            multiple
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    inputRef={register}
                                    label="Web page" margin="normal" />}
                            onChange={(_, opts) => setValue("web_page", opts.map(o => o.value))}
                        />

                        <AsyncAutocomplete
                            name="language"
                            collectionName="languages"
                            id="language"
                            style={{ width: 300 }}
                            openOnFocus
                            fullWidth
                            multiple
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    inputRef={register}
                                    label="Language" margin="normal" />}
                            onChange={(_, opts) => setValue("language", opts.map(o => o.value))}
                        />

                        <AsyncAutocomplete
                            name="country"
                            collectionName="countries"
                            id="country"
                            style={{ width: 300 }}
                            openOnFocus
                            fullWidth
                            multiple
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    inputRef={register}
                                    label="Country" margin="normal" />}
                            onChange={(_, opts) => setValue("country", opts.map(o => o.value))}
                        />

                        <AsyncAutocomplete
                            name="keywords"
                            collectionName="keywords"
                            id="keywords"
                            style={{ width: 300 }}
                            openOnFocus
                            fullWidth
                            multiple
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    inputRef={register}
                                    label="Key words" margin="normal" />}
                            onChange={(_, opts) => setValue("keywords", opts.map(o => o.value))}
                        />

                    </Grid>
                </MuiPickersUtilsProvider>

                <Grid
                    container
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                    justify="space-around"
                >

                    <Button
                        variant="contained"
                        className="button-submit"
                        style={{ position: 'relative', right: 5, top: 5, margin: 5 }}
                        onClick={(event) => onResetClicked(event)}>
                        Reset
                    </Button>

                    <Button
                        variant="contained"
                        className="button-submit"
                        color="primary"
                        type="submit"
                        style={{ position: 'relative', right: 5, top: 5, margin: 5 }}
                        form="search-form" 
                    >
                        Search
                    </Button>

                </Grid>
            </Box>
        </form>
    );
}