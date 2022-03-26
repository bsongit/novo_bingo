import axios from 'axios';

export default axios.create({
  baseURL: 'http://162.214.107.96:5001/api',
  headers: {"Access-Control-Allow-Origin": "*"} 
})