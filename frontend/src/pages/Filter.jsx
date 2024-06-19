import React, { useState, useEffect, useMemo } from 'react'
import { useLocation, useSearchParams, useOutletContext } from 'react-router-dom';
import { Button } from '@mui/material';
import { useLoaderData, Outlet, useNavigate, Link as RL } from "react-router-dom";
import { styled } from '@mui/material/styles';
import {
    Chip, Box, Paper,
} from '@mui/material';
import { GetRelation } from '../data/GetUser';
import ResponsiveAppBar from "../components/Nav";
import Footer from '../components/Footer';
import { NavLinks } from '../data/NavLinks';
import Breadcrumb from '../components/Breadcrumb';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Typography from '@mui/material/Typography';
import Loading from '../components/PageLoad';
import { Pagination } from '@mui/material';
import PostCard from '../components/PortfolioSections/PostCard';
import { useSelector, useDispatch } from 'react-redux';
import { ToggleTagChip, ToggleToolChip, ResetChip } from '../features/FilterChip/FilterChipSlice';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
/**
* Renders a PaperComponent with draggable functionality.
*
* @param {Object} props - The props for the PaperComponent.
* @return {JSX.Element} The rendered PaperComponent.
*/
function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

/**
 * Renders a filter chip component.
 *
 * @param {Object} index - The index of the chip.
 * @param {Object} label - The label object for the chip.
 * @return {JSX.Element} The JSX element representing the filter chip component.
 */
export function FilterChip({ index, label }) {
    const [activeChip, setActiveChip] = useState(false);
    const dispatch = useDispatch();
    const chipState = useSelector((state) => state.filterChipValue.value);

    useEffect(() => {
        if (label.tag + '_tag' in chipState.tags || label.tool + '_tool' in chipState.tools) {
            setActiveChip(true)
            // console.log('exists');
        } else {
            setActiveChip(false)

        }
    }, [chipState.tags, chipState.tools])

    const toggleChipFilter = (value, chipType) => {
        dispatch(chipType === 'tag' ? ToggleTagChip(value) : ToggleToolChip(value));
        // console.log(chipState);
    };
    // console.log(chipState)
    return (
        <div>
            <Chip
                onClick={() => toggleChipFilter([label.id, (label.tag ? label.tag + '_tag' : label.tool + '_tool')], label.tag ? 'tag' : 'tool')}
                key={index}
                color={'primary'}
                variant={activeChip ? '' : 'outlined'}
                sx={{ m: 0.5, textTransform: 'capitalize' }}
                label={label.tag || label.tool}
                icon={!activeChip ? <AddCircleIcon /> : <CancelIcon />}
            />
        </div>
    )
}

/**
 * Renders a draggable filter dialog component.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.data - The data to be displayed in the dialog.
 * @param {string} props.item - The item to be displayed in the dialog title.
 * @return {JSX.Element} The JSX element representing the floating draggable filter dialog component.
 */
export function DraggableFilterDialog({ data, item }) {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    // console.log(data)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleChipReset = () => {

        dispatch(ResetChip(item));
        // console.log(chipType);
    }


    // const count = useSelector((state) => state.counter.value);
    // console.log(count);

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                filter by {item || ''}
            </Button>
            <Dialog
                keepMounted
                open={open}
                scroll='paper'
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} textTransform={'capitalize'} id="draggable-dialog-title">
                    {item || ''}
                </DialogTitle>

                <DialogContent dividers={'paper'}>
                    <DialogContentText>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {
                                data && data.length > 0 ? data.map((value, index) => <FilterChip key={index} label={value} />) : `${item} not found or not available`
                            }
                        </Box>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleChipReset}>
                        Reset Filter
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}



/**
 * Renders a select category component.
 *
 * @return {JSX.Element} The rendered select category component.
 */
export function CategorySelect() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = React.useState('');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
        dispatch(ResetChip('tools'));
        navigate(`/filter/${event.target.value}/`);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategory}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value={'projects'}>Projects</MenuItem>
                    <MenuItem value={'posts'}>Posts</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

/**
 * Renders a select category component.
 *
 * @return {JSX.Element} The JSX element representing the select category component.
 */
export function SelectCategory() {

    const [tags, setTags] = useState('')
    const [tools, setTools] = useState('');

    useEffect(() => {
        async function getData() {
            setTags(await GetRelation(`http://127.0.0.1:8000/api/all_tags/`))
            setTools(await GetRelation(`http://127.0.0.1:8000/api/all_tools/`))
        }
        getData();
    }, []);
    // console.log(tags)
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box>
                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                }}>
                    <CategorySelect />
                    <DraggableFilterDialog data={tags} item={'tags'} />
                    <DraggableFilterDialog data={tools} item={'tools'} />
                    {/* <Button>clear all filters</Button> */}
                </Box>
            </Box>
        </Box>
    )
}


/**
 * Renders a view that displays a filtered list of posts based on the selected category.
 *
 * @return {JSX.Element} The JSX element representing the filtered view.
 */
export function FilterView() {
    // const dispatch = useDispatch();
    const category = useLoaderData();
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [result, setResult] = useState([]);
    const [count, setCount] = useState(0);
    const [initialCategory, setInitialCategory] = useState('');
    const chipState = useSelector((state) => state.filterChipValue.value);
    let tagqp = '';
    let toolqp = '';

    for (const [key, data] of Object.entries(chipState.tags)) {
        tagqp += `&tags=${data}`;
    }
    for (const [key, data] of Object.entries(chipState.tools)) {
        toolqp += `&tools=${data}`;
    }

    useEffect(() => {
        async function FetchData() {
            if (initialCategory !== category.value) {
                setInitialCategory(category.value);
                setPage(1)
                // setCount(0);
            }
            // console.log(category);

            setResult(await GetRelation(`http://127.0.0.1:8000/api/${category.value}/?page=${page}&publish=true${tagqp}${toolqp}`))
            if (result && result.results) {
                // console.log(initialCount);
                setData(result.results);
                // if (result.previous == null) {
                //     setInitialCount(Math.ceil(result.count / data.length));
                // }
                if (result.previous == null && result.count > data.length) {
                    setCount(Math.ceil(result.count / data.length));
                } else if (result.previous == null && result.count == data.length) {
                    setCount(1);

                }
                // initialCount ? setCount(initialCount) : setCount(1);
                setLoading(false);
            } else {
                setPage(1)
                // console.log(page, result);
            }
        }
        FetchData();
    }, [category.value, page,
    result.count, count,
    result.next,
    chipState.tools, chipState.tags,
        tagqp, toolqp
    ])

    const handleChange = (event, value) => {
        // console.log(event);
        setPage(value);
    };
    if (loading) {
        return <Loading />
    }
    return (
        <Box>
            {data && data.length > 0 ? (<Box sx={{ width: '100%' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 1, sm: 8, md: 12 }}
                        sx={{ justifyContent: 'center' }}>
                        {data && data.slice(0, 6).map((value, index) => (
                            <Grid xs={2} sm={4} md={4} key={index}>
                                <PostCard type='Project' post={value} mode={value.tools ? "Project" : "Post"} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={count}
                        variant="outlined"
                        color="primary"
                        page={page}
                        onChange={handleChange}
                    />
                </Box>
            </Box>) : <Typography textAlign={'center'}>No {category.value}</Typography>}
        </Box>
    );
}

/**
 * Renders the Filter component with category selection and context outlet.
 *
 * @return {JSX.Element} The rendered Filter component.
 */
function Filter() {

    const location = useLocation();

    return (
        <React.Fragment>
            <ResponsiveAppBar pages={NavLinks} />
            <Box padding={{ xs: "10px", sm: "50px" }} sx={{ minHeight: '90vh' }}>
                <Breadcrumb path={location} />
                <Box>
                    <Box mb={4}>
                        <SelectCategory />
                    </Box>

                    <Outlet />
                </Box>
            </Box>
            <Footer />
        </React.Fragment>
    );
}


export default Filter;
