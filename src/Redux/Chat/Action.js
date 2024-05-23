import api from "@/config/api";
import { FETCH_CHAT_BY_PROJECT_REQUEST, FETCH_CHAT_BY_PROJECT_SUCCESS, FETCH_CHAT_MESSAGES_FAILURE, FETCH_CHAT_MESSAGES_REQUEST, FETCH_CHAT_MESSAGES_SUCCESS, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "./ActionType"

export const sendMessage = (messageData) => {
    return async (dispatch) => {
        dispatch({type:SEND_MESSAGE_REQUEST});
        try {
            const response = await api.post("/api/messages/send",messageData)
            dispatch({type:SEND_MESSAGE_SUCCESS,message:response.data})
            console.log("send message success ",response);
        } catch (error) {
            console.log("send message error ",error);
        }
    }
}

export const fetchChatByProject = (projectId) => {
    return async (dispatch) => {
        dispatch({type:FETCH_CHAT_BY_PROJECT_REQUEST});
        try {
            const response = await api.get(`/api/projects/${projectId}/chat`)
            dispatch({type:FETCH_CHAT_BY_PROJECT_SUCCESS,chat:response.data})
            console.log("fetch chat by project success ",response.data);
        } catch (error) {
            console.log("fetch chat by project error ",error);
        }
    }
}

export const fetchChatMessages = (chatId) => {
    return async (dispatch) => {
        dispatch({type:FETCH_CHAT_MESSAGES_REQUEST});
        try {
            const response = await api.get(`/api/messages/chat/${chatId}`)
            dispatch({type:FETCH_CHAT_MESSAGES_SUCCESS,chatId,messages:response.data})
            console.log("fetch chat message success ",response.data);
        } catch (error) {
            dispatch({
                type: FETCH_CHAT_MESSAGES_FAILURE,
                error: error.message,
              });
            console.log("fetch chat message error ",error);
        }
    }
}