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
  const types = ["All", "Forks", "Archives", "Mirrors"];
  const [languages, setLanguages] = useState(["All"]);
  const [typePopup, setTypePopup] = useState(false);
  const [languagePopup, setLanguagePopup] = useState(false);

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
    dispatch(fetchRepos());
  }, [dispatch]);

  const isFiltersSet = () => {
    if (filters.query === "" && filters.type === "All" && filters.language === "All") {
      return false;
    }
    return true;
  }

  const handleFilterChange = (ev) => {
    setFilters({
      ...filters,
      query: ev.target.value
    })
  }

  useEffect(() => {
    const result = repositories.filter(repository => {
      let queryResult = false;
      let typeResult = false;
      let languageResult = false;
      if (repository.name.indexOf(filters.query) !== -1) {
        queryResult = true;
      }
      if (repository.description && repository.description.indexOf(filters.query) !== -1) {
        queryResult = true;
      }
      switch(filters.type) {
        case "Forks":
          if (repositories.fork) typeResult = true;
          break;
        case "Archives":
          if (repositories.archived) typeResult = true;
          break;
        case "Mirrors":
          if (repositories.mirror_url) typeResult = true;
          break;
        case "All":
          typeResult = true;
          break;
        default:
          break;
      }
      if (filters.language === "All" || repository.language === filters.language) {
        languageResult = true;
      }
      if (queryResult && typeResult && languageResult) {
        return true;
      }
      return false;
    });
    setFilterRepo(result);
  },[filters, repositories]);

  useEffect(() => {
    const onlyUnique = (value, index, self) => { 
      return value && value.length && self.indexOf(value) === index;
    }
    const languageArr = repositories.map(repository => repository.language).filter(onlyUnique);
    setLanguages(["All", ...languageArr]);
  }, [repositories])

  return (
    <section className="section__right">
      <div className="search">
        <div className="search__bar">
          <input className="search__box" placeholder="Find a repository..." value={filters.query} onChange={handleFilterChange} />
        </div>
        <div className="search__filter search__filter--popup">
          <div onClick={() => {setTypePopup(!typePopup); setLanguagePopup(false);}}><span>Type: <b>{filters.type}</b></span></div>
          {typePopup ? 
            <div className="search__popup">
              {types.map((type) => {
                return (
                  <div className={["popup__item", type === filters.type ? "selected-bold" : ""].join(" ")} onClick={() => {setFilters({...filters, type}); setTypePopup(false);}}>
                    {type}
                  </div>
                )
              })}
            </div>
            :
            null
          }
        </div>
        <div className="search__filter search__filter--popup">
          <div onClick={() => {setLanguagePopup(!languagePopup); setTypePopup(false);}}><span>Language: <b>{filters.language}</b></span></div>
          {languagePopup ? 
            <div className="search__popup">
              {languages.map((language) => {
                return (
                  <div className={["popup__item", language === filters.language ? "selected-bold" : ""].join(" ")} onClick={() => {setFilters({...filters, language}); setLanguagePopup(false);}}>
                    {language}
                  </div>
                )
              })}
            </div>
            :
            null
          }
        </div>
        <div className="search__new button button__primary">
          New
        </div>
      </div>
      {isFiltersSet() && filterRepo.length ?
        <div className="filterresult">
          <b>{filterRepo.length}</b>&nbsp;Repositories Found
        </div>
        : null
      }
      <div className="list">
        {isFiltersSet() ?
          filterRepo.length ?
            filterRepo.map((repository) => {
              return (
                <div className="list__item">
                  <div>
                    <div className="item__name">
                      <div className="heading__primary"><a href={repository.html_url}>{repository.name}</a></div>
                    </div>
                    <div className="item__desc">
                      <div className="heading__tertiary">{repository.description}</div>
                    </div>
                    <div className="item__info">
                      <div className="info__primary">{repository.language}</div>
                    </div>
                  </div>
                  <div>
                    <div className="button button__secondary">Star</div>
                  </div>
                </div>
              )
            })
            :
            <div className="noresults">
              <b>0</b>&nbsp;Repositories Found
            </div>
          :
          repositories.length ?
            repositories.map((repository) => {
              return (
                <div className="list__item">
                  <div>
                    <div className="item__name">
                      <div className="heading__primary"><a href={repository.html_url}>{repository.name}</a></div>
                    </div>
                    <div className="item__desc">
                      <div className="heading__tertiary">{repository.description}</div>
                    </div>
                    <div className="item__info">
                      <div className="info__primary">{repository.language}</div>
                    </div>
                  </div>
                  <div>
                    <div className="button button__secondary">Star</div>
                  </div>
                </div>
              )
            })
            :
            <div className="noresults">
              No Repositories Found
            </div>
        }
      </div>
    </section>
  );
}

export default RightPanel;