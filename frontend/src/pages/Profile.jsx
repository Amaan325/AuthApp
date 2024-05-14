import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef();
  const [image, setImage] = useState(undefined);
  const [imagePer, setImagePer] = useState();
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (image) {
      handleUpload(image);
    }
  }, [image]);
  const handleUpload = (image) => {
    if (image) {
      console.log(image);
      const storage = getStorage();
      const storageRef = ref(storage, new Date().getTime() + image.name);
      const uploadedImage = uploadBytesResumable(storageRef, image);
      uploadedImage.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePer(Math.round(progress));
        },
        (error) => {
          setImageError(error);
        },
        () => {
          getDownloadURL(uploadedImage.snapshot.ref).then((downloadURL) => {
            setFormData(...prevData, { profilePicture: downloadURL });
          });
        }
      );
    }
  };
  return (
    <div className="mx-auto max-w-lg ">
      <h1 className="font-semibold text-center text-3xl mt-9 my-4 ">Profile</h1>
      <form className="flex flex-col gap-2">
        <input
          className="hidden "
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        ></input>
        <img
          className="w-20 h-20 rounded-full self-center mb-3 cursor-pointer"
          src={currentUser.profilePicture}
          onClick={() => fileRef.current.click()}
        ></img>
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-800">
              Error Uploading Image (Image size must be less than 2mb)
            </span>
          ) : imagePer > 0 && imagePer < 100 ? (
            <span className="text-slate-500">Uploading: {imagePer}%</span>
          ) : imagePer === 100 ? (
            <span className="text-green-600">
              Image Uploaded Successfully!!!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
          type="text"
          name="username"
          placeholder="Username"
        ></input>
        <input
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
          type="email"
          name="email"
          placeholder="Email"
        ></input>
        <input
          className="bg-slate-200 rounded-lg p-2 text-[15px]"
          type="password"
          name="password"
          placeholder="Password"
        ></input>
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase">
          Update
        </button>
      </form>
      <div className="mt-3 flex justify-between">
        <span className="text-red-700 font-normal">Delete Account</span>
        <span className="text-red-700 font-normal">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
