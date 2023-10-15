import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API,
});

export const api = instance;


// class ApiError extends Error {
//   status: number;
//   constructor(message:string, status:number) {
//     super(message); // (1)
//     this.name = "ApiError";
//     this.status = status;
//   }
// }