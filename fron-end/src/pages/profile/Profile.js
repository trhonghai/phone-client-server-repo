import React, { useEffect, useState } from 'react';
import './Profile.scss';
import PageMenu from '../../components/pageMenu/PageMenu';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/Card';
import { getUser, updateUser } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';
import { AiOutlineCloudUpload } from "react-icons/ai";
import { shortenText } from '../../utils';


const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;




const Profile = () => {
    const {isLoading, user} = useSelector(
        (state) => state.auth
      )
    const initialState = {
        name: user?.name || "",
        email: user?.email || "",   
        phone: user?.phone || "",
        role: user?.role || "",
        photo:user?.photo || "",
        address: {
            address: user?.address?.address || "",
            city: user?.address?.city || "",
            country: user?.address?.country || "",

        },
    }

    const [profile, setProfile] = useState(initialState);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const dispatch = useDispatch();

    useEffect(() =>{    
        if(user){
            setProfile({
                name: user?.name || "",
                email: user?.email || "",   
                phone: user?.phone || "",
                role: user?.role || "",
                address:{
                    address: user?.address?.address || "",
                    city: user?.address?.city || "",
                    country: user?.address?.country || "",
                },
            })
        }
    },[dispatch, user])

    useEffect(() =>{    
       if(user === null){
        dispatch(getUser());
       }
    },[dispatch, user])

    

    const handleInputChange = (e) =>{
        const {name, value} =  e.target
        console.log(value)

        setProfile({ ...profile, [name]:value });

    }
    

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
        setImagePreview(URL.createObjectURl(e.target.files[0]));

    }

    const saveProfile = async (e) => {

        e.preventDefault();

        const userData = {
            name:profile.name,
            phone:profile.phone,
            address:{
                address: profile.address,
                city: profile.city,  
                country: profile.country,
            },
        };

        console.log(userData);
        await dispatch(updateUser(userData)); 

    }

    const savePhoto = async(e) => {
        e.preventDefault();
        let imageURL;

        try {
            if(
                profileImage !== null &&
                (profileImage.type === "image/jpeg" || profileImage.type === "image/jpg" || 
                    profileImage.type === "image/png")
            ){
                const image = new FormData();
                image.append("file", profileImage);
                image.append("cloud_name", cloud_name);
                image.append("upload_preset", upload_preset);
            }   
        } catch (error) {
            
        }
    }

  return (
    <>  
        <section>
            {isLoading && <Loader />}
        <div className='container'>
            <PageMenu />
            <h2>Profile</h2>
            <div className='--flex-start profile '>
                <Card cardClass={"card"}>
                    {!isLoading && (
                        <>
                            <div className='profile-photo'>
                                <div>
                                    <img src={imagePreview === null ? user?.photo : imagePreview} alt="profile" />
                                    <h3>Role: {profile.role}</h3>
                                    <div className='--center-all'>
                                        {imagePreview === null && (
                                            <button className='--btn --btn-secondary' onClick={savePhoto}>
                                                <AiOutlineCloudUpload size={18} /> Upload Photo
                                            </button>
                                        )}
                                    </div> 
                                    
                                </div>
                            </div>
                            <form onSubmit={saveProfile}>
                                <p>
                                    <label>Change Photo:</label>
                                    <input 
                                        type='file'
                                        accept='image/*'
                                        name='image'
                                        onChange={handleImageChange}
                                    /> 
                                </p>
                                <p>
                                    <label>Name:</label>
                                    <input 
                                        type='text'
                                        name='name'
                                        value={profile?.name}
                                        onChange={handleInputChange}
                                        required
                                    /> 
                                </p>
                                <p> 
                                    <label>Email:</label>
                                    <input 
                                        type='email'
                                        name='email'
                                        value={profile?.email}
                                        onChange={handleInputChange}
                                        disabled
                                    /> 
                                </p>
                                <p>
                                    <label>Phone:</label>
                                    <input 
                                        type='text'
                                        name='phone'
                                        value={profile?.phone}
                                        onChange={handleInputChange}
                                        required
                                    /> 
                                </p>
                                <p>
                                    <label>Address:</label>
                                    <input 
                                        type='text'
                                        name='address'
                                        value={profile?.address?.address}
                                        onChange={handleInputChange}
                                    /> 
                                </p>
                                <p>
                                    <label>City:</label>
                                    <input 
                                        type='text'
                                        name='city'
                                        value={profile?.address?.city}
                                        onChange={handleInputChange}
                                        required
                                    /> 
                                </p>
                                <p>
                                    <label>Country:</label>
                                    <input 
                                        type='text'
                                        name='country'
                                        value={profile?.address?.country}
                                        onChange={handleInputChange}
                                        required

                                    /> 
                                </p>
                                <button className='--btn --btn-primary --btn-block'>
                                    Update Profile
                                </button>
                            </form>
                        </>
                    )}
                </Card>
            </div>
        </div>
        
        </section>
    </>
  )
}

export const UserName = () =>{
    const { user} = useSelector(
        (state) => state.auth)
    
    const username = user?.name || "...";

    return ( 
        <span style={{color:"#ff7722"}}>Hi, {shortenText(username, 9)} |</span>
    )
    
};

export default Profile