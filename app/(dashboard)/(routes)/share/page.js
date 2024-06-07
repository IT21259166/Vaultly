"use client"

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import Link from 'next/link';

let app, db;

if (typeof window !== "undefined") {
  app = require('../../../../firebaseConfig').default;
  db = getFirestore(app);
}

function Page() {
  const { user } = useUser();
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [username, setUsername] = useState('');
  const [isUserValid, setIsUserValid] = useState(true);
  const [isUsernameEntered, setIsUsernameEntered] = useState(true);

  useEffect(() => {
    if (user) {
      getAllUserFiles();
    }
  }, [user]);

  const getAllUserFiles = async () => {
    const q = query(collection(db, "uploadedFile"), where("userEmail", "==", user.primaryEmailAddress.emailAddress));
    const querySnapshot = await getDocs(q);
    const files = [];
    querySnapshot.forEach((doc) => {
      files.push({ id: doc.id, ...doc.data() });
    });
    setFileList(files);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.value);
  };

  const handleUsernameChange = async (event) => {
    const inputValue = event.target.value;
    setUsername(inputValue);
    setIsUsernameEntered(inputValue.trim() !== '');

    if (inputValue.trim() !== '') {
      try {
        const response = await fetch('/api/checkUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: inputValue }),
        });
        const data = await response.json();
        setIsUserValid(data.userExists);
      } catch (error) {
        console.error('Error checking user:', error);
        setIsUserValid(false);
      }
    } else {
      setIsUserValid(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUsernameEntered(username.trim() !== '');

    if (isUserValid && selectedFile && username.trim() !== '') {
      alert(`File "${selectedFile}" shared with ${username}`);
      // Implement actual file sharing logic here
      // For example, updating the Firestore to add sharing info
      // await shareFileWithUser(selectedFile, username);
    } else {
      if (username.trim() === '') {
        alert('Please enter a username');
      } else {
        alert('Invalid user or no file selected');
      }
    }
  };

  useEffect(() => {
    if (fileList.length > 0) {
      setSelectedFile(fileList[0].fileName);
    }
  }, [fileList]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">Share Now</h1>
        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Upload, Save and easily Share your files in one place
        </p>
        <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">Enter Username to share</p>
          <div>
            <label htmlFor="username" className="sr-only">Username</label>
            <div className="relative">
              <input
                type="email"
                value={username}
                onChange={handleUsernameChange}
                className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${(!isUserValid || !isUsernameEntered) ? 'border-red-500' : ''}`}
                placeholder="Enter username"
              />
              {!isUserValid && username && (
                <p className="text-red-500 text-xs mt-2">User not registered</p>
              )}
              {!isUsernameEntered && (
                <p className="text-red-500 text-xs mt-2">Username is required</p>
              )}
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="file" className="sr-only">Select File</label>
            <select
              id="file"
              value={selectedFile}
              onChange={handleFileChange}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            >
              {fileList.map((file, index) => (
                <option key={index} value={file.fileName}>
                  {file.fileName}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
          >
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page;
