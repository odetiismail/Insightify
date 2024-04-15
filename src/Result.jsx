import React, { useEffect, useState } from "react";
import { db } from "./Firebase-config";
import { collection, getDocs, addDoc, doc, deleteDoc } from "@firebase/firestore";

export default function Result() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ORDERS"));
        console.log(querySnapshot.docs);
        const userData = querySnapshot.docs.map(doc => ({
          name: doc.name,
          ...doc.data()
        }));
        setUsers(userData);
      } catch (error) {
        setError("Error fetching users");
      }
    };

    getUsersData();
  }, []);

  const createUser = async () => {
    try {
      await addDoc(collection(db, "name"), { username: name });
      setName(""); // Clear input field after adding user
      const newUser = { username: name }; // Assuming the response from Firebase contains username
      setUsers([...users, newUser]); // Update state locally
    } catch (error) {
      setError("Error adding user");
    }
  };

  console.log(users)
  // const deleteUser = async (id) => {
  //   try {
  //     await deleteDoc(doc(db, "name", id));
  //     const updatedUsers = users.filter(user => user.id !== id); // Remove deleted user from state
  //     setUsers(updatedUsers);
  //   } catch (error) {
  //     setError("Error deleting user");
  //   }
  // };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <div className="text-dark">
        <h1 className=" w-screen text-center mt-8 text-4xl font-bold">
          React with FireBase
        </h1>
        <p className="w-screen text-center mt-5">
          Fill in the Details to Upload Data to the DataBase
        </p>
        <div className="text-center mt-16">
          <span>Enter your Name : </span>
          <input
            className="mx-4 text-black"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <br />
          <button
            onClick={createUser}
            className="bg-slate-700 m-4 p-2 w-20 rounded-md"
          >
            Upload
          </button>
        </div>
      </div>
      <div className="text-dark mt-20 mx-6">
        <h3 className="text-xl">Users:</h3>
        <div className="grid grid-cols-2">
          {users.map((user,index) => {
            return (
              <div key={index} className="hover:animate-pulse m-4 bg-gray-600 w-1/4 rounded-md p-2">
                {/* <p className="w-auto text-center">User Name : {user.name}</p>
                <p className="w-auto text-center">User Born : {user.age.born}</p>
                <p className="w-auto text-center">User Age : {user.age.now}</p> */}
                {/* <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete User
                </button> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}