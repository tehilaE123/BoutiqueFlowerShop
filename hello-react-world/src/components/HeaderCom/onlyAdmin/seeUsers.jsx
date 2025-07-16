import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../../Store/Slice/userSlice";
import "./seeUsers.css";

export default function SeeUsers() {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="usersContainer">
      <div className="usersBox">
        <h2>רשימת משתמשים</h2>
        {allUsers.length === 0 ? (
          <p>אין משתמשים להצגה</p>
        ) : (
          <table className="usersTable">
            <thead>
              <tr>
                <th>שם</th>
                <th>אימייל</th>
                <th>כתובת</th>
                <th>תפקיד</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
