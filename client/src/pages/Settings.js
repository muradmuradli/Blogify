import Sidebar from "../components/Sidebar";
import { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../context/context";
import Alert from "../components/Alert";

const Settings = () => {
  const { user, updateUser, displayAlert, isLoading, showAlert } =
    useAppContext();
  console.log(user);

  const [file, setFile] = useState(null);
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  console.log(file);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !username || !email || !file) {
      displayAlert();
      return;
    }

    updateUser({ name, username, email, file });
  };

  return (
    <Wrapper className="settings">
      <div className="settingsWrapper">
        {showAlert && <Alert />}
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : user.profilePicture}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Name</label>
          <input
            type="text"
            placeholder={user.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="settingsSubmit"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
      <Sidebar />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 100px;
  display: flex;

  .settingsWrapper {
    flex: 9;
    padding: 20px;
  }

  .settingsTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .settingsUpdateTitle {
    font-size: 30px;
    margin-bottom: 20px;
    color: lightcoral;
  }

  .settingsDeleteTitle {
    color: red;
    font-size: 12px;
    cursor: pointer;
  }

  .settingsForm {
    display: flex;
    flex-direction: column;
  }

  .settingsPP {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }

  .settingsPP > img {
    width: 70px;
    height: 70px;
    border-radius: 20px;
    object-fit: cover;
  }

  .settingsPPIcon {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: lightcoral;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    cursor: pointer;
  }

  .settingsForm > label {
    font-size: 20px;
    margin-top: 20px;
  }

  .settingsForm > input {
    color: gray;
    margin: 10px 0;
    height: 30px;
    border: none;
    border-bottom: 1px solid lightgray;
  }

  .settingsSubmit {
    width: 150px;
    align-self: center;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: teal;
    padding: 10px;
    margin-top: 20px;
    cursor: pointer;
  }

  .settingsSubmit:disabled {
    background-color: #717171;
    cursor: not-allowed;
  }
`;

export default Settings;
