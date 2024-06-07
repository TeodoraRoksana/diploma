import { createAction, props } from '@ngrx/store';
import { Tag } from 'src/app/models/tag';

export const addTag = createAction(
    '[MenuComponent] Add Tag',
    props<{ tag: Tag }>()
);

export const deleteTag = createAction(
    '[MenuComponent] Delete Tag',
    props<{ id: number }>()
);

export const setListOfTags = createAction(
    '[MenuComponent] Set All Tags',
    props<{ tags: Tag[] }>()
);