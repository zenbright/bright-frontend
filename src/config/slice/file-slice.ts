import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface File {
    name: string;
    // Add other file properties if needed
}

interface FileState {
    queue: File[];
}

const initialState: FileState = {
    queue: [],
};

const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        addFile: (state, action: PayloadAction<File>) => {
            state.queue.push(action.payload);
        },
        removeFile: (state, action: PayloadAction<string>) => {
            state.queue = state.queue.filter(
                file => file.name !== action.payload
            );
        },
        clearFiles: state => {
            state.queue = [];
        },
    },
});

export const { addFile, removeFile, clearFiles } = fileSlice.actions;
export const selectFileQueue = (state: { file: FileState }) => state.file.queue;

export default fileSlice.reducer;
