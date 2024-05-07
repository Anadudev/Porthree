import React, { useState, useEffect } from 'react'
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

    const handleChipClick = () => {
        activeChip ? setActiveChip(false) : setActiveChip(true);
        // console.log(activeChip);
    };

    return (
        <div>
            <Chip
                onClick={handleChipClick}
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
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    <Button autoFocus onClick={handleClose}>
                        Apply
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

    const [selectedCategory, setSelectedCategory] = React.useState('');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
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
    const category = useLoaderData();
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [result, setResult] = useState([]);
    const [count, setCount] = useState(0);
    const [initialCount, setInitialCount] = useState(0);
    const [initialCategory, setInitialCategory] = useState('');

    useEffect(() => {
        async function FetchData() {
            if (initialCategory !== category.value) {
                /* reset the pagination navigation on url modification ie(redirection) */
                setInitialCategory(category.value);
                setInitialCount(0);
                setPage(1)
            }
            setResult(await GetRelation(`http://127.0.0.1:8000/api/${category.value}/?page=${page}&publish=true`))
            if (result && result.results) {
                setData(result.results);
                if (initialCount === 0) {
                    setInitialCount(Math.ceil(result.count / result.results.length));
                }

                setCount(initialCount || Math.ceil(result.count / result.results.length));
                setLoading(false);
            }
            // console.log(category.value);
        }
        FetchData();
    }, [category, page, result.count, count, result.next])
    const handleChange = (event, value) => {
        setPage(value);
    };
    if (loading) {
        return <Loading />
    }
    // console.log(initialCount);
    return (
        <Box>
            {data && data.length > 0 ? (<Box sx={{ width: '100%' }}>
                <Box
                    spacing={2}
                    sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
                >
                    {data && data.slice(0, 6).map((value, index) => (
                        <Box item key={index}>
                            <PostCard post={value || ''} mode={category.value === "projects" ? "Project" : "Post"} />
                        </Box>
                    ))}
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

    const routerResponse = useLoaderData();
    const location = useLocation();
    // const [category, setCategory] = useState('');

    const [queryString, setQuerySrting] = useSearchParams();
    const [reset, setReset] = useState(0);

    // console.log(...queryString)
    /* for (const [key, value] of queryString.entries()) {
        console.log(key, value);
    }
 */

    return (
        <React.Fragment>
            <ResponsiveAppBar pages={NavLinks} />
            <Box padding={{ xs: "10px", sm: "50px" }}>
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
