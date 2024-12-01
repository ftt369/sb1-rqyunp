export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type Case = {
  id: string;
  created_at: string;
  title: string;
  client_id: string;
  type: string;
  status: string;
  description: string | null;
};

export type Client = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  status: string;
};

export type Document = {
  id: string;
  created_at: string;
  name: string;
  case_id: string;
  size: number;
  type: string;
  url: string;
};