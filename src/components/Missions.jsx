import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions, joinMission } from '../redux/missions/missionSlice';
import LoadingSpinner from './Loading';
import './Missions.css';

const Missions = () => {
  const { missions, isLoading } = useSelector((state) => state.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    if (missions.length === 0) {
      dispatch(fetchMissions());
    }
  }, [dispatch, missions.length]);

  if (isLoading) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  return (
    <div className="missions-div">
      <table>
        <thead>
          <tr>
            <td>Mission</td>
            <td>Description</td>
            <td>Status</td>
            <td> </td>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.id}>
              <td className="mission-name">{mission.name}</td>
              <td className="mission-description">{mission.description}</td>
              <td className="member-button">
                {
                !mission.reserved ? (
                  <button className="non-active" type="button">NOT A MEMBER</button>
                )
                  : (
                    <button className="active-member" type="button">Active Member</button>
                  )
                }
              </td>
              <td className="join-button">
                {
                !mission.reserved ? (
                  <button type="button" id={mission.id} onClick={() => dispatch(joinMission(mission.id))}>
                    Join Mission
                  </button>
                )
                  : (
                    <button type="button" className="border-red" id={mission.id} onClick={() => dispatch(joinMission(mission.id))}>
                      Leave Mission
                    </button>
                  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Missions;
