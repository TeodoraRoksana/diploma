import { state } from "@angular/animations";
import { AppState } from "../app.state";
import { createSelector } from "@ngrx/store";
import { TagState } from "./tag.reducer";

export const selectTags = (state: AppState) => state.tags;
export const selectTagsFromStore = createSelector(
    selectTags,
    (state: TagState) => state.tags,
);