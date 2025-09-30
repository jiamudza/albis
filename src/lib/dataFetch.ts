import axios from "axios";

// bikin fungsi fetch reusable
export async function useNewStudent() {
  const res = await axios.get(`http://localhost:5000/api/getNewStudents`);
  return res.data;
}