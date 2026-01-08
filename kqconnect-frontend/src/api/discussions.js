import axios from "./axios";

export const fetchThreads = () =>
  axios.get("/api/discussions/threads/");

export const fetchThread = (id) =>
  axios.get(`/api/discussions/threads/${id}/`);

export const createThread = (data) =>
  axios.post("/api/discussions/threads/", data);

export const replyToThread = (id, data) =>
  axios.post(`/api/discussions/threads/${id}/reply/`, data);
