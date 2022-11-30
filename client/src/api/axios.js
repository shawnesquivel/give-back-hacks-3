import axios from "axios";

// remote
export default axios.create({
  baseURL: "http://humankynd.herokuapp.com",
});

// local
// export default axios.create({
//   baseURL: "http://localhost:5000",
// });
