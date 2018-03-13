import { ForumState, TopicDetail } from "./forum.data.models";
import * as forumActions from "./forum.actions";

const initState: ForumState = {
  allTopics: null,
  selectedTopic: null,
  topicDetail:null
};

export function forumReducer(
  state: ForumState = initState,
  action: forumActions.Actions
) {
  switch (action.type) {
    case forumActions.GET_ALL_TOPICS_SUCCESS: {
      return Object.assign({},state,{allTopics: action.payload });
    }
    
    case forumActions.SET_SELECTED_TOPIC: {
      return Object.assign({},state,{selectedTopic: action.payload });
    }
 
    case forumActions.GET_TOPIC_DETAILS_SUCCESS: {
      return Object.assign({},state,{topicDetail: action.payload });
    }

    default:
      return state;
  }
}
