import axios from "axios";

// bikin fungsi fetch reusable
export async function useNewStudent(search:string) {
  const res = await axios.get(`/api/getNewStudents?search=${search}`);
  return res.data;
}