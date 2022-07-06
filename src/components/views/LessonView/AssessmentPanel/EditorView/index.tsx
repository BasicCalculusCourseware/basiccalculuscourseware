// LIB-FUNCTIONS
import { atom, useResetRecoilState } from 'recoil';
// COMPONENTS
import EditorView from './EditorView';

// MAIN-COMPONENT
export default EditorView;

/* STATES START */

// ATOMS
const tab = atom<number>({
    key: 'EV.tab',
    default: 0,
});
export const EVAtoms = { tab };

// HOOKS
export const useResetData = () => {
    const resetTab = useResetRecoilState(EVAtoms.tab);
    return () => {
        resetTab();
    };
};

/* STATES END */
