import React, { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import FilterOptions from "./FilterOptions";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ProjectCharts from "./ProjectCharts";
import ProjectContext from "./ProjectContext";
import { Web3Context } from "../contexts/Web3Context"; // Corrected import statement
import uniCoinWhite from "/Users/josephdelgiorgio/UniCoinsV3/my-app/src/assets/UniCoinWhite.jpeg";


const Dashboard = () => {
  const { projects } = useContext(ProjectContext);
  const { volunteerKPIs, loading } = useContext(Web3Context);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  const filterAndSortProjects = (category, sortOrder) => {
    const filtered = projects.filter(project =>
      category ? project.category === category : true
    );
    const sorted = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredProjects(sorted);
  };

  const searchProjects = (searchTerm) => {
    const searchResults = projects.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(searchResults);
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <img className="top-left-image" src={uniCoinWhite} alt="Top Left UniCoin" />
      <img className="top-right-image" src={uniCoinWhite} alt="Top Right UniCoin" />
      <div className="dashboard">
        {!loading ? (
        <div className="volunteer-kpis">
          <h2>Volunteer KPIs</h2>
          <p>Completed Tasks: {volunteerKPIs.completedTasks}</p>
          {volunteerKPIs.onTimeCompletionRate !== undefined && (
          <p>
            On-Time Completion Rate:{" "}
            {volunteerKPIs.onTimeCompletionRate.toFixed(2)}
          </p>
          )}
           {volunteerKPIs.managerRatings !== undefined && (
          <p>
            Average Manager Ratings:{" "}
            {volunteerKPIs.managerRatings.toFixed(2)}
          </p>
           )}
          <p>Other Metrics: {volunteerKPIs.otherMetrics}</p>
        </div>
      ) : (
        <div className="volunteer-kpis">
          <h2>Volunteer KPIs</h2>
          <p>Loading...</p>
        </div>
      )}
      <div className="filter-section">
        <FilterOptions filterAndSortProjects={filterAndSortProjects} />
        <SearchBar searchProjects={searchProjects} />
      </div>
      <ProjectCharts projects={currentProjects} />
      <Pagination
        projectsPerPage={projectsPerPage}
        totalProjects={filteredProjects.length}
        paginate={paginate}
      />
    </div>
    </>
  );
};

export default Dashboard;
