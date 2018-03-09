import { ForumState } from "./forum.data.models";
import * as forumActions from "./forum.actions";

const initState: ForumState = {
  allTopics: null,
  selectedTopic: null
};

export function forumReducer(
  state: ForumState = initState,
  action: forumActions.Actions
) {
  switch (action.type) {
    case forumActions.GET_ALL_TOPICS_SUCCESS: {
      return Object.assign({},state,{allTopics: action.payload });
    }

    default:
      return state;
  }
}
