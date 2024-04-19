import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";

import Spinner from "../components/Spinner";
import IssuesTable from "../components/home/IssuesTable";
import IssuesCard from "../components/home/IssuesCard";
import SearchBar from "../components/home/SearchBar";

const Home = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/issues")
      .then((res) => {
        setIssues(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
      .finally(setLoading(false));
  }, []);

  return (
    <div className="p-4 py-10">
      <SearchBar setSearch={setSearch} />

      <div className="flex justify-between items-center px-5 pt-10">
        <h1 className="text-3xl">Issues List</h1>
        <div className="flex justify-center items-center gap-x-4">
          <button
            className="text-white bg-purple-900 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("table")}
          >
            Table View
          </button>
          <button
            className="text-white bg-purple-900 hover:bg-sky-600 px-4 py-1 rounded-lg"
            onClick={() => setShowType("card")}
          >
            Card View
          </button>
          <Link to="/issues/create">
            <MdOutlineAddBox className="text-purple-900 text-4xl hover:text-sky-600" />
          </Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <IssuesTable issues={issues} search={search} />
      ) : (
        <IssuesCard issues={issues} />
      )}
    </div>
  );
};

export default Home;
