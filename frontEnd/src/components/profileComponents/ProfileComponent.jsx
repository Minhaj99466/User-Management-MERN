
import avatar from '../../assets/userAssets/download (3).jpg';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { ProfileValidation } from '../../yupValidation/Validation';

import { useNavigate } from 'react-router-dom'

import styles from '../../styles/Username.module.css';
import extend from '../../styles/Profile.module.css'
import { GetProfile, UpDateProfile } from '../../api/UserApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUserDetails } from '../../redux/userSlice';


export default function Profile() {

  const navigate = useNavigate()
  const userInfo = useSelector((state) => state.user.userInfo);

  const dispatch = useDispatch();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);

  useEffect(() => {
    const showUserData = async () => {
      try {
        const id = userInfo.id;
        const response = await GetProfile(id);
        if (response) {
          setLoading(true);
          const userDetails = {
            id: response.data._id,
            name: response.data.name,
            email: response.data.email,
            date: response.data.date,
            place: response.data.place,
            image: response.data.image,
          };
          dispatch(
            setUserDetails({
              userInfo: userDetails,
            })
          );
          setProfile(false);
        }
        setLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    showUserData();
  }, [profile]);


  useEffect(() => {
    setLoading(true);
    const modifiedImageUrl = userInfo.image.replace('public\\', ''); // Remove "public\" from the URL
    setImage(`http://localhost:3000/files/${modifiedImageUrl}`);
    setLoading(false);
  }, [userInfo.image]);

  const initialValues = {
    name: userInfo.name,
    email: userInfo.email,
    place: userInfo.place,
    date: userInfo.date,
    image: userInfo.image
  };
  const { values, errors, touched, handleBlur, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: ProfileValidation,
      onSubmit: async (values) => {
        try {
          const id = userInfo.id;
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("date", values.date);
          formData.append("place", values.place);
          formData.append("image", values.image);
          const response = await UpDateProfile(formData, id);
          console.log(response.data);
          if (response.data.updated) {
            setProfile(true);
            toast.success(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      },
    });




  // Remove "public\" from the URL



  // logout handler function
  function userLogout() {
    localStorage.removeItem('userToken');
    navigate('/login')
  }

  if (loading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  // if (error) return <h1 className='text-xl text-red-500'>{error.message}</h1>

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center  my-10'>
        <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%", paddingTop: '2em' }}>

          <div className="title flex flex-col items-center ">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-4 text-xl w-2/3 text-center text-black'>
              You can update the details.
            </span>
          </div>


          <form onSubmit={handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <label htmlFor="profile">

                <img src={image ? `${image}` : avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
              </label>

              <input onChange={(e) => {
                const selectedFile = e.currentTarget.files[0];
                setFieldValue("image", selectedFile);
              }}
                type="file" id='profile' name='profile' />
            </div>

            <div className="textbox flex flex-col items-center gap-4 ">
              <div className="flex justify-between items-center" style={{ width: '75%' }}>

                <div className='w-full' >
                  <input label="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Name' />
                  {touched.name && errors.name && (
                    <p className="pt-2 text-xs italic text-red-500">
                      {errors.name} </p>)}
                </div>
                <div className='w-full'>

                  <input
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    className={`${styles.textbox} ${extend.textbox}`} type="Date" placeholder='DOB' />
                  {touched.date && errors.date && (
                    <p className="pt-2 text-xs italic text-red-500">
                      {errors.date} </p>)}
                </div>
              </div>


              <input
                name="email"
                value={values.email}
                className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' readOnly />



              <input
                name="place"
                value={values.place}
                onChange={handleChange}
                onBlur={handleBlur}

                className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Place' />
              {touched.place && errors.place && (
                <p className="pt-2 text-xs italic text-red-500">
                  {errors.place} </p>)}
              <button className={styles.btn} type='submit'>Update</button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className='text-black'>come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
          </div>

        </div>
      </div>
    </div>
  )
}

