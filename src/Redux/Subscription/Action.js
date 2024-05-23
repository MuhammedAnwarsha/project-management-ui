import api from "@/config/api"
import { GET_USER_SUBSCRIPTION_REQUEST, GET_USER_SUBSCRIPTION_SUCCESS, UPGRADE_SUBSCRIPTION_REQUEST, UPGRADE_SUBSCRIPTION_SUCCESS } from "./ActionType"

export const getUserSubscription = () => {
    return async (dispatch) => {
        dispatch({type:GET_USER_SUBSCRIPTION_REQUEST})
        try {
            const response = await api.get("/api/subscriptions/user",{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("jwt")}`
                },
            })
            dispatch({type:GET_USER_SUBSCRIPTION_SUCCESS,payload:response.data})
            console.log("user subscription success ",response.data)
        } catch (error) {
            console.log("user subscription error", error)
        }
    }
}

export const upgradeSubscription = ({planType}) => {
    return async (dispatch) => {
        dispatch({type:UPGRADE_SUBSCRIPTION_REQUEST})
        try {
            const response = await api.patch("/api/subscriptions/upgrade",null,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("jwt")}`
                },
                params:{
                    planType:planType
                }
            })
            dispatch({type:UPGRADE_SUBSCRIPTION_SUCCESS,payload:response.data})
            console.log("upgrade subscription success ",response.data)
        } catch (error) {
            console.log("upgrade subscription error", error)
        }
    }
}