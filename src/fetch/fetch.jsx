import axios from "axios";
export const fetchData = async (q, page, perPage) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q=${q}&page=${page}&key=37828594-2a1dcba166f42d48673b13374&image_type=photo&orientation=horizontal&per_page=12`
    );
    const data = response.data;
    return data.hits;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
