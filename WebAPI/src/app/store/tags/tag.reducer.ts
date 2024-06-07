import { createReducer, on } from "@ngrx/store";
import { Tag } from "src/app/models/tag";
import { addTag, deleteTag, setListOfTags } from "./tag.actions";


export interface TagState{
    tags: Tag[];
    error: string;
    status: 'error' | 'loading' | 'none'
}

export const initialState: TagState = {
    tags: [],
    error: '',
    status: 'none',
}

export const tagReducer = createReducer(
    initialState,
    on(addTag, (state, { tag }) => ({
        ...state,
        tags: [...state.tags, tag],
    })),
    on(deleteTag, (state, { id }) => ({
        ...state,
        tags: state.tags.filter((tag) => tag.id != id),
    })),
    on(setListOfTags, (state, { tags }) => ({
        ...state,
        tags: tags,
    })),
);