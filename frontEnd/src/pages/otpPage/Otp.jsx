import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import Lock from '../../assets/userAssets/Lock.jpg'
import { Button, Card, CardBody, CardHeader, Spinner, Typography } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import { OtpVerify, ResendOTP } from "../../api/UserApi";

function Otp() {
    const [otp, setOtp] = useState('');
    const [load, setLoad] = useState(false);
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const navigate = useNavigate()
    const email = useParams()


    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);


    const handleSubmit = async () => {
        try {
            setLoad(true)
            const response = await OtpVerify({ email, otp });
            setTimeout(() => {

                setLoad(false)
            }, 2000)
            console.log(response, "this is my response");
            if (response.data.verified) {
                toast.success(response.data.message)
                setTimeout(() => {
                    setLoad(false)
                    navigate('/login')
                }, 1000)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const resendOTP = async () => {
        setMinutes(1);
        setSeconds(30);
        try {

            const response = await ResendOTP(email);
            if (response.status == 200) {
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log(error.message);
        }

    };




    return (

        <div className="flex justify-center items-center h-screen bg-[#c0bab8]">
            <div><Toaster /></div>
            <Card className="w-full max-w-[48rem] flex-row">
                <CardHeader
                    shadow={false}
                    floated={false}
                    className="m-0 w-2/5 shrink-0 rounded-r-none hidden sm:block"
                >
                    <img
                        src={Lock}
                        alt="card-image"
                        className="h-full w-full object-cover "
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant="h4" color="blue-gray">
                        Enter OTP
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Enter otp send to your mail for successful registration
                    </Typography>
                    <div className="flex justify-center mt-8 mb-2 w-80 max-w-screen-lg sm:w-5 md:w-96" >


                        <div className="grid gap-3">

                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={4}
                                inputStyle={{
                                    width: "50px",
                                    marginBottom: "10px",
                                    height: "50px",
                                    backgroundColor: "grey",
                                    fontStyle: 'italic',
                                    color: 'white',
                                    borderRadius: '6px'
                                }}
                                renderSeparator={<span
                                    style={{
                                        fontSize: "7px",
                                        marginLeft: "5px",
                                        marginRight: "5px",
                                        border: '1px'
                                    }}
                                >
                                    {" "}
                                </span>}

                                renderInput={(props) => <input {...props} />}
                            />
                            <div className="countdown-text">
                                {seconds > 0 || minutes > 0 ? (
                                    <p>
                                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                        {seconds < 10 ? `0${seconds}` : seconds}
                                    </p>
                                ) : (
                                    <p> Didn't recieve code?</p>
                                )}

                                <button
                                    disabled={seconds > 0 || minutes > 0}
                                    style={{
                                        color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                                    }}
                                    onClick={resendOTP}
                                >
                                    Resend OTP
                                </button>
                            </div>

                            {otp.length > 3 ? (
                                !load ? (
                                    <Button type="button" className="mt-6 w-full" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                ) : (
                                    <Button className="mt-6 w-full" >
                                        <Spinner className="ml-20" />
                                    </Button>

                                )
                            ) : null}

                        </div>

                    </div>
                </CardBody>
            </Card>
        </div>


    )
}

export default Otp
