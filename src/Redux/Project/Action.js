import api from "@/config/api";
import {
  ACCEPT_INVITATION_REQUEST,
  ACCEPT_INVITATION_SUCCESS,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECT_BY_ID_REQUEST,
  FETCH_PROJECT_BY_ID_SUCCESS,
  INVITE_TO_PROJECT_REQUEST,
  INVITE_TO_PROJECT_SUCCESS,
  SEARCH_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
} from "./ActionType";

export const fetchProjects =
  ({ category, tag }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PROJECTS_REQUEST });
    try {
      const { data } = await api.get("/api/projects", {
        params: { category, tag },
      });
      dispatch({ type: FETCH_PROJECTS_SUCCESS, projects: data });
      console.log("get all projects success ", data);
    } catch (error) {
      console.log("get all projects error ", error);
    }
  };

export const searchProjects = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_PROJECT_REQUEST });
  try {
    const { data } = await api.get("/api/projects/search?keyword=" + keyword);
    dispatch({ type: SEARCH_PROJECT_SUCCESS, projects: data });
    console.log("search projects success ", data);
  } catch (error) {
    console.log("search projects error ", error);
  }
};

export const createProject = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await api.post("/api/projects", projectData);
    dispatch({ type: CREATE_PROJECT_SUCCESS, project: data });
    console.log("create project success ", data);
  } catch (error) {
    console.log("create project error ", error);
  }
};

export const fetchProjectById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
  try {
    const { data } = await api.get("/api/projects/" + id);
    dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, project: data });
    console.log("get project by id success ", data);
  } catch (error) {
    console.log("get project by id error ", error);
  }
};

export const deleteProject =
  ({ projectId }) =>
  async (dispatch) => {
    dispatch({ type: DELETE_PROJECT_REQUEST });
    try {
      const { data } = await api.delete("/api/projects/" + projectId);
      dispatch({ type: DELETE_PROJECT_SUCCESS, projectId });
      console.log("delete project success ", data);
    } catch (error) {
      console.log("delete project error ", error);
    }
  };

export const inviteToProject =
  ({ email, projectId }) =>
  async (dispatch) => {
    dispatch({ type: INVITE_TO_PROJECT_REQUEST });
    try {
      const { data } = await api.post("/api/projects/invite", {
        email,
        projectId,
      });
      dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data });
      console.log("invite to project success ", data);
    } catch (error) {
      console.log("invite to project error ", error);
    }
  };

export const acceptInvitation =
  ({ invitationToken, navigate }) =>
  async (dispatch) => {
    dispatch({ type: ACCEPT_INVITATION_REQUEST });
    try {
      const { data } = await api.get("/api/projects/accept_invitation", {
        params: {
          token: invitationToken,
        },
      });
      navigate("/project" + data.projectId);
      dispatch({ type: ACCEPT_INVITATION_SUCCESS, payload: data });
      console.log("accept invitation success ", data);
    } catch (error) {
      console.log("accept invitation error ", error);
    }
  };
