import { API_URL as ConfigAPI_URL, TOKEN as ConfigTOKEN } from '../config';

export const API_URL = process.env.REACT_APP_API_URL || ConfigAPI_URL;
export const TOKEN = process.env.REACT_APP_TOKEN || ConfigTOKEN;