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
    <section className="section__left">
      {profile ?
        <div className="profile">
          <div className="profile__image">
            <img className="avatar" src={profile.avatar_url} alt="avatar" />
          </div>
          <div className="profile__description">
            <div className="heading__primary">{profile.name}</div>
            <div className="heading__secondary">{profile.login}</div>
            <br/>
            <div className="heading__tertiary">{profile.bio}</div>
          </div>
          <div className="profile__actions">
            <div className="button button__secondary">Edit Profile</div>
          </div>
          <div className="profile__stats">
            <div className="info__secondary">
              <b>{profile.followers}</b>&nbsp;followers&nbsp;<sup>.</sup>&nbsp;<b>{profile.following}</b>&nbsp;following&nbsp;<sup>.</sup>
            </div>
          </div>
          <div className="profile__info">
            <div className="info__primary">{profile.company}</div>
            <div className="info__primary">{profile.location}</div>
          </div>
        </div>
        :
        null
      }
    </section>
  );
}

export default LeftPanel;