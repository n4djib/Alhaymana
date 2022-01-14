import axios from "axios";

import { API_URL } from "./urls";

export const fetcher = async (url) => {
  const res = await axios(url);
  return await res.data;
};

/* Agents */

export const getAgents = async () => {
  const res = await axios(`${API_URL}/agents`);
  return await res.data;
};

export const getAgent = async (id) => {
  const res = await axios(`${API_URL}/agents/${id}`);
  return await res.data;
};

export const createAgent = async (formData) => {
  const resp = await axios.post(`${API_URL}/agents`, formData);
  const data = await resp.data;
};

export const updateAgent = async (id, formData) => {
  const resp = await axios.put(`${API_URL}/agents/${id}`, formData);
  const data = await resp.data;
};

export const deleteAgent = async (id) => {
  const res = await axios.delete(`${API_URL}/agents/${id}`);
  return await res.data;
};

/* Articles */

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

/* Sites */

export const getSites = async () => {
  const res = await axios(`${API_URL}/sites`);
  return await res.data;
};

export const createSite = async (formData) => {
  const resp = await axios.post(`${API_URL}/sites`, formData);
  const data = await resp.data;
};

export const updateSite = async (id, formData) => {
  const resp = await axios.put(`${API_URL}/sites/${id}`, formData);
  const data = await resp.data;
};

export const deleteSite = async (id) => {
  const res = await axios.delete(`${API_URL}/sites/${id}`);
  return await res.data;
};

/* Groupes */

export const getGroupes = async () => {
  const res = await axios(`${API_URL}/groupes`);
  return await res.data;
};

export const createGroupe = async (formData) => {
  const resp = await axios.post(`${API_URL}/groupes`, formData);
  const data = await resp.data;
};

export const updateGroupe = async (id, formData) => {
  const resp = await axios.put(`${API_URL}/groupes/${id}`, formData);
  const data = await resp.data;
};

export const deleteGroupe = async (id) => {
  const res = await axios.delete(`${API_URL}/groupes/${id}`);
  return await res.data;
};

/* Decharges */

export const getDecharges = async () => {
  const res = await axios(`${API_URL}/decharges`);
  return await res.data;
};

export const getDechargesByAgent = async (agent_id) => {
  const res = await axios(`${API_URL}/decharges?agent=${agent_id}`);
  return await res.data;
};

export const createDecharge = async (formData) => {
  const resp = await axios.post(`${API_URL}/decharges`, formData);
  const data = await resp.data;
};

export const updateDecharge = async (id, formData) => {
  const resp = await axios.put(`${API_URL}/decharges/${id}`, formData);
  const data = await resp.data;
};

export const deleteDecharge = async (id) => {
  const res = await axios.delete(`${API_URL}/decharges/${id}`);
  return await res.data;
};
