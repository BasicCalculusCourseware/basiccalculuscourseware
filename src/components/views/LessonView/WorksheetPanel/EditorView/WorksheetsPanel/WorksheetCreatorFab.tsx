// LIB-COMPONENTS
import { Tooltip, Zoom } from '@mui/material';
// COMPONENT
import { CreatorFab } from 'src/components/styled';
import { AddIcon } from 'src/components/icons';
// RECOIL
import { useSetModal } from '.';

// MAIN-COMPONENT
export default function WorksheetCreatorFab() {
    // RECOIL CUSTOM HOOKS
    const setModal = useSetModal();
    // RENDER
    return (
        <Tooltip title="Create Worksheet">
            <Zoom in={true}>
                <CreatorFab
                    color="primary"
                    onClick={() => setModal({ creator: true })}
                >
                    <AddIcon />
                </CreatorFab>
            </Zoom>
        </Tooltip>
    );
}