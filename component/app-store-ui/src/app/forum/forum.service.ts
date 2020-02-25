import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetTopicsParam, TopicResult, CreateTopicParam, PostCommentParam } from './forum.data.models';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../config/api.endpoints';

@Injectable()
export class ForumService{

    constructor(private http:HttpClient){}

    getAllTopics(param:GetTopicsParam):Observable<TopicResult>{       
        let endpoint = `${ApiEndpoints.forum.topicList}/start/${param.page*param.size}/count/${param.size}`;
        return this.http.get<TopicResult>(endpoint);
    }

    searchForum(searchTerm:string){
        let url = `${ApiEndpoints.forum.search}/${encodeURI(searchTerm)}`;
        return this.http.get(url);
    }

    deleteTopic(topicId:string){
        let payload = {id:topicId};
        return this.http.post(ApiEndpoints.forum.deleteTopic, payload);
    }

    createTopic(param:CreateTopicParam){
        return this.http.post(ApiEndpoints.forum.createTopic,param);
    }

    postComment(param:PostCommentParam){
        return this.http.post(ApiEndpoints.forum.postReply,param);
    }

    deleteComment(commentId:string){
        let payload = {replyId:commentId};
        return this.http.post(ApiEndpoints.forum.deleteReply,payload);
    }
  
    getOneTopic(topicId:string){
        return this.http.get(ApiEndpoints.forum.topicList+'/'+topicId);
    }
}