import baseUrl from "@/helpers/baseUrl";
import Radiobox from "@/components/RadioBox";
import React, { useState, useEffect } from "react";
import Checkbox from "@/components/checkbox";
// import baseUrl from '@/helpers/baseUrl';
import { useRouter } from "next/router";
import Dropdown from "@/components/dropdown";
import stateDropdown from "@/components/states";
import Link from "next/link";

const signup = () => {
  const router = useRouter();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(
    name,
    email,
    password,
    mobile,
    selectedGender,
    selectedMedia,
    selectedOption
  );

  const handleRadioBoxChange = (name) => {
    setSelectedGender(name);
  };

  const handleCheckboxChange = (name) => {
    setSelectedMedia((prevMedia) => {
      return prevMedia.includes(name)
        ? prevMedia.filter((Media) => Media !== name)
        : [...prevMedia, name];
    });
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  async function handleSubmit() {
    // event.preventDefault();
    // console.log(name , email , password , mobile , selectedGender , selectedMedia , selectedOption)
    const res = await fetch('https://usercrud-three.vercel.app/api/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Email: email,
        Mobile: mobile,
        Gender: selectedGender,
        Media: selectedMedia,
        State: selectedOption,
        Password: password,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      router.push("/");
      // M.toast({ html: res2.error, classes: "red" });
    } else {
      // M.toast({ html: res2.message, classes: "green" });
      router.push("/login");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-20">
      <div className="flex flex-col rounded-2xl bg-white md:flex-row md:items-center shadow-lg">
        <div className="md:p-5">
          <div className="text-left p-5 flex flex-col gap-4">
            <p className="text-3xl font-serif font-bold py-4">Sign-Up</p>
            <p className="text-gray-500 max-w-sm">Create your account</p>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full h-10 mt-4 p-6 rounded-md border"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id='ashish'
              />
              <input
                type="email"
                placeholder="Enter your E-mail"
                className="w-full h-10 mt-4 p-6 rounded-md border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='Email'
              
              />

              <input
                type="text"
                placeholder="Enter your Mobile No"
                className="w-full h-10 mt-4 p-6 rounded-md border"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                
                id='mobi'
              />

              <div className="py-2 flex gap-3">
                <h3 className="">Gender : </h3>
                <div className="flex flex-row justify-between gap-4">
                  <Radiobox
                    label="Male"
                    name="Male"
                    checked={selectedGender === "Male"}
                    onChange={() => handleRadioBoxChange("Male")}
                
                  />
                  <div className="mr-36">
                    <Radiobox
                      label="Female"
                      name="Female"
                      checked={selectedGender === "Female"}
                      onChange={() => handleRadioBoxChange("Female")}
                    
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-col">
                <h3 className="text-md">how did you hear about this ?</h3>
                <div className="flex flex-col gap-1">
                  <Checkbox
                    label="LinkedIn"
                    name="LinkedIn"
                    checked={selectedMedia.includes("LinkedIn")}
                    onChange={() => handleCheckboxChange("LinkedIn")}
                  />
                  <Checkbox
                    label="Friends"
                    name="Friends"
                    checked={selectedMedia.includes("Friends")}
                    onChange={() => handleCheckboxChange("Friends")}
                  />
                  <Checkbox
                    label="Job Portal"
                    name="Job Portal"
                    checked={selectedMedia.includes("Job Portal")}
                    onChange={() => handleCheckboxChange("Job Portal")}
                  />

                  <Checkbox
                    label="Other"
                    name="Other"
                    checked={selectedMedia.includes("Other")}
                    onChange={() => handleCheckboxChange("Other")}
                  />
                </div>
              </div>

              <div className="mt-2">
                <Dropdown
                  options={[
                    "Andhra Pradesh",
                    "Arunachal Pradesh",
                    "Assam",
                    "Bihar",
                    "Chhattisgarh",
                    "Goa",
                    "Gujarat",
                    "Haryana",
                    "Himachal Pradesh",
                    "Jammu and Kashmir",
                    "Jharkhand",
                    "Karnataka",
                    "Kerala",
                    "Madhya Pradesh",
                    "Maharashtra",
                    "Manipur",
                    "Meghalaya",
                    "Mizoram",
                    "Nagaland",
                    "Odisha",
                    "Punjab",
                    "Rajasthan",
                    "Sikkim",
                    "Tamil Nadu",
                    "Telangana",
                    "Tripura",
                    "Uttarakhand",
                    "Uttar Pradesh",
                    "West Bengal",
                    "Andaman and Nicobar Islands",
                    "Chandigarh",
                    "Dadra and Nagar Haveli",
                    "Daman and Diu",
                    "Delhi",
                    "Lakshadweep",
                    "Puducherry",
                  ]}
                  value={selectedOption}
                  onChange={handleOptionChange}
                />
              </div>

              <input
                type="password"
                placeholder="Enter your Password"
                className="w-full h-10 mt-2 p-6 rounded-md border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name='Pass'
                id='userPassword'
              />
              <div className="flex flex-col md:flex-row md:justify-between items-center justify-center gap-7 mt-4">
                <button
                  type="submit"
                  className="w-3/4 bg-cyan-800 hover:bg-cyan-600 md:w-48 text-white rounded-md border h-14 text-lg"
                >
                  SignUp
                </button>
                <Link href="/login">
                  <button className="w-3/4 bg-cyan-800 hover:bg-cyan-600 md:w-48 text-white rounded-md border h-14 text-lg">
                    Login
                  </button>
                </Link>
              </div>
            </form>
            <hr className="border mt-5" />
          </div>
        </div>
        <img
          src="/image.jpg"
          alt=""
          className="w-[430px] h-fit hidden md:block"
        />
      </div>
    </div>
  );
};

export default signup;
