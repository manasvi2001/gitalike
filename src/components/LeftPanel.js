import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

function LeftPanel() {
  const profile = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const fetchProfile = () => {
    return dispatch => {
      fetch("https://api.github.com/users/supreetsingh247")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          dispatch({
            type: "FETCH_PROFILE",
            payload: data
          })
        });
    }
  }

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  
  return (
    <section className="left__panel">
      {profile ?
        <div className="profile">
          <div className="profile__image"></div>
          <div className="profile__description"></div>
          <div className="profile__actions"></div>
          <div className="profile__stats"></div>
          <div className="profile__info"></div>
        </div>
        :
        null
      }
    </section>
  );
}

export default LeftPanel;