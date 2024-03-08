import { Button } from "@material-tailwind/react";
import {  useNavigate } from "react-router-dom";


export default function Notfound() {
    const navigate = useNavigate()
  return (
      <div style={{backgroundImage:"url('https://i.pinimg.com/564x/fa/e9/99/fae999862951fb6edb2e1a727e76e0d6.jpg')"}}>
      <section  className="flex items-center h-screen p-16  dark:text-gray-100">
	<div  className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
				<span className="sr-only">Error</span> 4<span className="font-serif">0</span>4
			</h2>
			<p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
			<p className="mt-4 mb-8 dark:text-gray-400">But dont worry, you can find plenty of other things on our homepage.</p>
			<Button onClick={()=>navigate('/')} variant="outlined">Back to homepage</Button>
		</div>
	</div>


</section>
    </div>
  )
}


