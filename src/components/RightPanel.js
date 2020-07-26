import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

function RightPanel() {
  const [filters, setFilters] = useState({
    query: "",
    type: "All",
    language: "All"
  });
  const repositories = useSelector(state => state.repositories);
  const [filterRepo, setFilterRepo] = useState(repositories);
  const dispatch = useDispatch();

  const fetchRepos = () => {
    return dispatch => {
      fetch("https://api.github.com/users/supreetsingh247/repos")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          dispatch({
            type: "FETCH_REPOS",
            payload: data
          })
        });
    }
  }

  useEffect(() => {
    // dispatch(fetchRepos());
  }, [dispatch]);

  const isFiltersSet = () => {
    if (filters.query === "" && filters.type === "All" && filters.language === "All") {
      return false;
    }
    return true;
  }

  const filterRepositories = () => {
    // Filter Logic
    repositories.filter(el => el);
  }

  return (
    <section className="section__right">
      <div className="search">
        <div className="search__bar"></div>
        <div className="search__filter"></div>
        <div className="search__filter"></div>
      </div>
      {isFiltersSet() ?
        <div className="filter"></div>
        : null
      }
      {isFiltersSet() ?
        filterRepo.length ?
          filterRepo.map((respository) => {
            return (
              <div>

              </div>
            )
          })
          :
          <div className="noresults">
          </div>
        :
        repositories.length ?
          repositories.map(el => {
            return (
              <div>

              </div>
            )
          })
          :
          <div className="noresults">
          </div>
      }
    </section>
  );
}

export default RightPanel;