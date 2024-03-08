
import * as Yup from 'yup';



const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(16, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export const LoginSchema = Yup.object({
  email: Yup.string().email().required("Please Enter Your email id"),
  password: Yup.string().min(4).required("Please enter password"),
});


export const ProfileValidation = Yup.object({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  place: Yup.string().min(4,"Too short").max(15,"Too Long").required('enter a place'),
  number: Yup.string(),
  date: Yup.date()
  .max(new Date(), 'Date of birth must be in the past')
  
  .required('Date of birth is required'),
tenYearsAgo: Yup.date().default(() => new Date(new Date().setFullYear(new Date().getFullYear() - 10))),
});


export default SignupSchema