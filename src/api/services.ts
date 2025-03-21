import axios from "axios";

const API_URL = "http://demo0111712.mockable.io";

export const getNormalRange = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/normal-range`);
    return data;
  } catch (error) {
    void error;
    return [];
  }
};

export const getFixedRange = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/fixed-range`);
    return data;
  } catch (error) {
    void error;
    return [];
  }
};
