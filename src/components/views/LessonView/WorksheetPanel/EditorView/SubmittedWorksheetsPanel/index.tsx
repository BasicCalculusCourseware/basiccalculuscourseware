// TYPES
import type { SubmittedWorksheet, Worksheet } from 'src/interfaces';
// LIB-FUNCTIONS
import {
    atom,
    useSetRecoilState,
    useRecoilValue,
    useResetRecoilState,
} from 'recoil';
// FUNCTIONS
import { getAllSubmittedWorksheets } from 'src/firebase/client/utils/submitedWorksheet';
import { initialStates } from 'src/utils';
// COMPONENTS
import SubmittedWorksheetsPanel from './SubmittedWorksheetsPanel';

// MAIN-COMPONENT
export default SubmittedWorksheetsPanel;

/* STATES START */

// ATOMS
const worksheet = atom<Worksheet>({
    key: 'SWP.worksheet' + Date.now(),
    default: initialStates.worksheet,
});
const sworksheets = atom<SubmittedWorksheet[]>({
    key: 'SWP.sworksheets' + Date.now(),
    default: [],
});
const isLoading = atom<boolean>({
    key: 'SWP.isLoading' + Date.now(),
    default: false,
});
const selected = atom<SubmittedWorksheet>({
    key: 'SWP.selected' + Date.now(),
    default: initialStates.submittedWorksheet,
});
const modals = atom<{ deleter: boolean }>({
    key: 'SWP.modals' + Date.now(),
    default: {
        deleter: false,
    },
});
export const SWPAtoms = {
    worksheet,
    sworksheets,
    isLoading,
    selected,
    modals,
};

// HOOKS
export const useSetModal = () => {
    const setModals = useSetRecoilState(SWPAtoms.modals);
    return (data: Partial<{ deleter: boolean }>) => {
        setModals((modals) => ({ ...modals, ...data }));
    };
};
export const useFetchData = () => {
    const worksheet = useRecoilValue(SWPAtoms.worksheet);
    const setSWorksheets = useSetRecoilState(SWPAtoms.sworksheets);
    const setIsLoading = useSetRecoilState(SWPAtoms.isLoading);
    return async () => {
        if (!worksheet.id) return;
        setIsLoading(true);
        const sworksheets = await getAllSubmittedWorksheets(worksheet.id);
        setSWorksheets(sworksheets);
        setIsLoading(false);
    };
};
export const useResetData = () => {
    const resetWorksheet = useResetRecoilState(SWPAtoms.worksheet);
    const resetSWorksheets = useResetRecoilState(SWPAtoms.sworksheets);
    const resetIsLoading = useResetRecoilState(SWPAtoms.isLoading);
    const resetSelected = useResetRecoilState(SWPAtoms.selected);
    const resetModals = useResetRecoilState(SWPAtoms.modals);
    return () => {
        resetWorksheet();
        resetSWorksheets();
        resetIsLoading();
        resetSelected();
        resetModals();
    };
};

/* STATES END */
