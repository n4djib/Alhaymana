import axios from "axios";

import { API_URL } from "./urls";

export const fetcher = async (url) => {
  const res = await axios(url);
  return await res.data;
};

export const getAgents = async () => {
  const res = await axios(`${API_URL}/agents`);
  return await res.data;
};

export const getAgent = async (id) => {
  const res = await axios(`${API_URL}/agents/${id}`);
  return await res.data;
};

export const getArticles = async () => {
  const res = await axios(`${API_URL}/articles`);
  return await res.data;
};

export const createArticle = async (formData) => {
  const resp = await axios.post(`${API_URL}/articles`, formData);
  const data = await resp.data;
};

export const updateArticle = async (id, formData) => {
  const resp = await axios.put(`${API_URL}/articles/${id}`, formData);
  const data = await resp.data;
};

export const deleteArticle = async (id) => {
  const res = await axios.delete(`${API_URL}/articles/${id}`);
  return await res.data;
};

export const getSites = async () => {
  const res = await axios(`${API_URL}/sites`);
  return await res.data;
};

export const deleteSite = async (id) => {
  const res = await axios.delete(`${API_URL}/sites/${id}`);
  return await res.data;
};

export const getGroupes = async () => {
  const res = await axios(`${API_URL}/groupes`);
  return await res.data;
};

export const getDecharges = async () => {
  const res = await axios(`${API_URL}/decharges`);
  return await res.data;
};
