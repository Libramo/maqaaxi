import axios from "axios";

export default axios.create({
  // baseURL: "https://maqaaxi.herokuapp.com/api/v1/restaurants",
  baseURL: "http://localhost:3030/api/v1/restaurants",
});

// PGUSER=lnbzelwcexqaxx
// PGHOST=ec2-34-199-200-115.compute-1.amazonaws.com
// PGPASSWORD=64ce8eb5418481378cbb8ad244cd35264b7954cb2915b9f69e6086ad53ca2512
// PGDATABASE=d7ic7o5mkcufpe
// PGPORT=5432
