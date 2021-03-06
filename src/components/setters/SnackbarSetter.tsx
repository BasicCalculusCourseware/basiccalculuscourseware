// TYPES
import type { ChildrenProp } from 'src/interfaces';
// LIB-FUNCTIONS
import { useSnackbar as useNotiSnackbar } from 'notistack';
import { useEffect, useRef } from 'react';
// LIB-COMPONENTS
import { SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
// COMPONENTS
import { CloseIcon } from 'src/components/icons';
// RECOIL
import { useRecoilValue } from 'recoil';
import { snackbarAtoms, useDeleteSnackbarItem } from 'src/states/snackbar';

// MAIN-COMPONENT
export default function SnackbarSetter({ children }: ChildrenProp) {
    // NOTISTACK
    const notistackRef = useRef();
    const onClickDismiss = (key: string) => () => {
        // @ts-ignore
        notistackRef.current.closeSnackbar(key);
    };
    // RENDER
    return (
        <SnackbarProvider
            ref={notistackRef as any}
            maxSnack={1}
            autoHideDuration={3000}
            action={(key: any) => (
                <IconButton onClick={onClickDismiss(key)} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            )}
        >
            <SnackbarSubSetter>{children}</SnackbarSubSetter>
        </SnackbarProvider>
    );
}

// SUB-COMPONENT
function SnackbarSubSetter({ children }: ChildrenProp) {
    // NOTISNACK
    const { enqueueSnackbar } = useNotiSnackbar();
    // RECOIL
    const snackbarItems = useRecoilValue(snackbarAtoms.snackbarItems);
    const deleteSnackbarItem = useDeleteSnackbarItem();
    useEffect(() => {
        if (snackbarItems.length) {
            snackbarItems.map(({ id, message, variant }) => {
                enqueueSnackbar(message, { variant });
                deleteSnackbarItem(id);
            });
        }
    }, [enqueueSnackbar, snackbarItems, deleteSnackbarItem]);
    // RETURN
    return children;
}
