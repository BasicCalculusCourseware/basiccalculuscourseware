// LIB-FUNCTIONS
import { useEffect } from 'react';
// LIB-COMPONENTS
import { Grid, TextField } from '@mui/material';
// COMPONENTS
import Select from 'src/components/modules/Select';
// RECOIL
import { useRecoilState } from 'recoil';
import { teachersViewAtoms, useFilterTeachers } from '.';

// MAIN-COMPONENT
export default function SearchBox() {
    // RECOIL
    const [search, setSearch] = useRecoilState(teachersViewAtoms.search);
    const [filter, setFilter] = useRecoilState(teachersViewAtoms.filter);
    const [orderBy, setOrderBy] = useRecoilState(teachersViewAtoms.orderBy);
    const [orderDirection, setOrderDirection] = useRecoilState(
        teachersViewAtoms.orderDirection
    );
    const filterTeachers = useFilterTeachers();
    useEffect(() => {
        filterTeachers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, filter, orderBy, orderDirection]);
    // RENDER
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <TextField
                        variant="outlined"
                        label="Search"
                        placeholder="Search something..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4} lg={2}>
                    <Select
                        label="Filter"
                        value={filter}
                        setValue={(value) => setFilter(value)}
                        items={[
                            { label: 'All', value: 'all' },
                            { label: 'Teacher Verified', value: 'teacher-verified' },
                            {
                                label: 'Teacher Not Verified',
                                value: 'teacher-not-verified',
                            },
                        ]}
                    />
                </Grid>
                <Grid item xs={4} lg={2}>
                    <Select
                        label="Order By"
                        value={orderBy}
                        setValue={(value) => setOrderBy(value)}
                        items={[
                            { label: 'Name', value: 'name' },
                            { label: 'Created At', value: 'createdAt' },
                        ]}
                    />
                </Grid>
                <Grid item xs={4} lg={2}>
                    <Select
                        label="Order Direction"
                        value={orderDirection}
                        setValue={(value) => setOrderDirection(value)}
                        items={[
                            { label: 'Ascending', value: 'asc' },
                            { label: 'Descending', value: 'desc' },
                        ]}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

// STYLES
import { styled } from '@mui/material';
import styles from 'src/utils/styles';
const Container = styled('div')({
    ...styles.border(1),
    ...styles.borderRadius(1),
    ...styles.p(2),
    width: '100%',
    backgroundColor: 'white',
});