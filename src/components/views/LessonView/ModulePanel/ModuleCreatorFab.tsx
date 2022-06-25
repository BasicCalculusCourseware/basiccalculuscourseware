// LIB-COMPONENTS
import { Tooltip, Zoom } from '@mui/material';
// COMPONENT
import { CreatorFab } from 'src/components/styled';
import { AddIcon } from 'src/components/icons';
// RECOIL
import { useSetModal } from '.';

// MAIN-COMPONENT
export default function ModuleCreatorFab() {
    // RECOIL
    const setModal = useSetModal();
    // RENDER
    return (
        <Tooltip title="Create Module">
            <Zoom in={true}>
                <CreatorFab color="primary" onClick={() => setModal({ creator: true })}>
                    <AddIcon />
                </CreatorFab>
            </Zoom>
        </Tooltip>
    );
}
