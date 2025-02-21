import api from "@/config/api";
import {
  ASSIGNED_ISSUE_TO_USER_REQUEST,
  ASSIGNED_ISSUE_TO_USER_SUCCESS,
  CREATE_ISSUE_FAILURE,
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
  DELETE_ISSUE_REQUEST,
  DELETE_ISSUE_SUCCESS,
  FETCH_ISSUES_BY_ID_REQUEST,
  FETCH_ISSUES_BY_ID_SUCCESS,
  FETCH_ISSUES_REQUEST,
  FETCH_ISSUES_SUCCESS,
  UPDATE_ISSUE_STATUS_REQUEST,
  UPDATE_ISSUE_STATUS_SUCCESS,
} from "./ActionType";

export const fetchIssues = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ISSUES_REQUEST });
    try {
      const response = await api.get(`/api/issues/project/${id}`);
      dispatch({ type: FETCH_ISSUES_SUCCESS, issues: response.data });
      console.log("fetch issues success ", response);
    } catch (error) {
      console.log("fetch issues error", error);
    }
  };
};

export const createIssue = (issueData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ISSUE_REQUEST });
    try {
      const response = await api.post("/api/issues", issueData);
      dispatch({ type: CREATE_ISSUE_SUCCESS, issue: response.data });
      console.log("create issues success ", response.data);
    } catch (error) {
      dispatch({
        type: CREATE_ISSUE_FAILURE,
        error: error.message,
      });
      console.log("create issues error", error)
    }
  };
};

export const fetchIssueById = (id) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_ISSUES_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/issues/${id}`);
      dispatch({ type: FETCH_ISSUES_BY_ID_SUCCESS, issues: response.data });
      console.log("fetch issues by id success ", response);
    } catch (error) {
      console.log("fetch issues by id error", error);
    }
  };
};

export const updateIssueStatus = ({ id, status }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ISSUE_STATUS_REQUEST });
    try {
      const response = await api.put(`/api/issues/${id}/status/${status}`);
      dispatch({ type: UPDATE_ISSUE_STATUS_SUCCESS, issues: response.data });
      console.log("update issue status success ", response);
    } catch (error) {
      console.log("update issue status error", error);
    }
  };
};

export const assignedUserToIssue = ({ issueId, userId }) => {
  return async (dispatch) => {
    dispatch({ type: ASSIGNED_ISSUE_TO_USER_REQUEST });
    try {
      const response = await api.put(
        `/api/issues/${issueId}/assignee/${userId}`
      );
      dispatch({ type: ASSIGNED_ISSUE_TO_USER_SUCCESS, issue: response.data });
      console.log("assigned user to issue success ", response);
    } catch (error) {
      console.log("assigned user to issue error", error);
    }
  };
};

export const deleteIssue =
  ({ issueId }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_ISSUE_REQUEST });
    try {
      const { data } = await api.delete("/api/issues/" + issueId);
      dispatch({ type: DELETE_ISSUE_SUCCESS, issueId });
      console.log("delete issue success ", data);
    } catch (error) {
      console.log("delete issue error ", error);
    }
  };
