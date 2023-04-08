import React, { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import FilterOptions from "./FilterOptions";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ProjectCharts from "./ProjectCharts";
import ProjectContext from "./ProjectContext";

const Dashboard = () => {
  const { projects: initialProjects } = useContext(ProjectContext);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);

  useEffect(() => {
    setProjects(initialProjects);
    setFilteredProjects(initialProjects);
  }, [initialProjects]);

  useEffect(() => {
    if (initialProjects.length > 0) {
      setProjects(initialProjects);
      setFilteredProjects(initialProjects);
    } else {
      // Fetch projects from your backend API or local data source
      const fetchProjects = async () => {
        const response = await fetch("your-api-url");
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data);
      };
      fetchProjects();
    }
  }, [initialProjects]);

  const filterAndSortProjects = (filters, sortOptions) => {
    // Apply filters and sort options to the projects and set the filteredProjects state
  };

  const searchProjects = (searchTerm) => {
    // Search projects by title or description and set the filteredProjects state
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <SearchBar searchProjects={searchProjects} />
      <FilterOptions filterAndSortProjects={filterAndSortProjects} />
      {/* Use the filteredProjects for the ProjectCharts */}
      <ProjectCharts projects={filteredProjects} />
      <div className="project-list">
        {currentProjects.map((project) => (
          <div key={project.id} className="project">
            {/* ... */}
          </div>
        ))}
      </div>
      <Pagination
        projectsPerPage={projectsPerPage}
        totalProjects={filteredProjects.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Dashboard;
