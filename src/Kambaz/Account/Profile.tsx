import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Form, Button } from "react-bootstrap";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser]);

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };


  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };


  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <Form.Control
            id="wd-username"
            value={profile.username}
            onChange={(e) => setProfile({
              ...profile,
              username: e.target.value
            })}
            className="mb-2"
          />
          <Form.Control
            id="wd-password"
            type="password"
            value={profile.password}
            onChange={(e) => setProfile({
              ...profile,
              password: e.target.value
            })}
            className="mb-2"
          />
          <Form.Control
            id="wd-firstname"
            value={profile.firstName}
            onChange={(e) => setProfile({
              ...profile,
              firstName: e.target.value
            })}
            className="mb-2"
          />
          <Form.Control
            id="wd-lastname"
            value={profile.lastName}
            onChange={(e) => setProfile({
              ...profile,
              lastName: e.target.value
            })}
            className="mb-2"
          />
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
          <Button
            onClick={signout}
            className="btn btn-danger">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
