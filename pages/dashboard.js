import { useRouter } from "next/router";
import baseUrl from "@/helpers/baseUrl";
import React, { useState } from "react";
import Radiobox from "@/components/RadioBox";
import Checkbox from "@/components/checkbox";
import Dropdown from "@/components/dropdown";
let User;
const dashboard = (props) => {
  const userList = props.users;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();
  console.log(userList);

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
  };

  const handleEdit = (user) => {
    User = user;
    setIsEditOpen(!isEditOpen);
  };

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobile, setMobile] = useState();
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const [filters, setFilters] = useState({
    sort: "default", // Initial sort order
  });
  // console.log(
  //   name,
  //   email,
  //   password,
  //   mobile,
  //   selectedGender,
  //   selectedMedia,
  //   selectedOption
  // );

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

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(
      name,
      email,
      password,
      mobile,
      selectedGender,
      selectedMedia,
      selectedOption
    );
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
      // M.toast({ html: res2.error, classes: "red" });
    } else {
      // M.toast({ html: res2.message, classes: "green" });
      window.location.reload();
    }
  }

  async function handleEditSubmit(event) {
    event.preventDefault();
    // console.log("clicked");
    // console.log(User);
    // console.log(name , email , password , mobile , selectedGender , selectedMedia , selectedOption)
    const res = await fetch('https://usercrud-three.vercel.app/api/dashboard', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: User,
        Name: name,
        Email: email,
        Mobile: mobile,
        State: selectedOption,
        Password: password,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      // M.toast({ html: res2.error, classes: "red" });
    } else {
      // M.toast({ html: res2.message, classes: "green" });
      window.location.reload();
    }
  }

  async function handleDelete(uid) {
    const res = await fetch('https://usercrud-three.vercel.app/api/dashboard', {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: uid,
      }),
    });
    const res2 = await res.json();
    window.location.reload();
    // console.log(res2);
  }

  let arr = [];
  //   console.log(userList[0].name);
  // Sample list of items
  for (let i = 0; i < userList.length; i++) {
    arr[i] = userList[i].name;
  }
  console.log(arr);
  const [items, setItems] = useState(arr);

  // State to handle sorting order
  const [sortOrder, setSortOrder] = useState("ASC"); // or 'DESC' for descending

  // Function to toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
  };

  // Function to handle sorting
  const handleSort = () => {
    const sortedItems = [...items].sort((a, b) => {
      if (sortOrder === "ASC") {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    });
    setItems(sortedItems);
    console.log(sortedItems);
    for (let i = 0; i < sortedItems.length; i++) {
      for (let j = 0; j < sortedItems.length; j++) {
        if (sortedItems[i] === userList[j].name) {
          [userList[i], userList[j]] = [userList[j], userList[i]];
        }
      }
    }
  };
  console.log(userList);

  return (
    <div>
      <div className="flex justify-between bg-blue-500">
        <h1 className="ml-5 text-white font-serif font-md text-4xl p-4">
          Dashboard
        </h1>
        <div className="flex justify-end gap-10 items-center">
          
          <div className="mr-5">
            <button onClick={handleClick} className="bg-blue-500 border duration-300 hover:scale-105 active:scale-95 hover:bg-blue-400 text-white font-medium px-3 py-1 rounded-md float-right overflow-hidden mr-3">Add New User</button>

            {isFormOpen && (
              <div className="floating-form absolute border rounded-md bg-white p-5 mt-14">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    className="w-full h-10 mt-4 p-6 rounded-md border"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Enter your E-mail"
                    className="w-full h-10 mt-4 p-6 rounded-md border"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    type="text"
                    placeholder="Enter your Mobile No"
                    className="w-full h-10 mt-4 p-6 rounded-md border"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />

<div className="py-2 flex gap-3">
                <h3 className="">Gender : </h3>
                <div className="flex flex-row justify-between gap-4">
                  <Radiobox
                    label="Male"
                    name="man"
                    checked={selectedGender === "man"}
                    onChange={() => handleRadioBoxChange("man")}
                  />
                  <div className="mr-36">
                    <Radiobox
                      label="Female"
                      name="woman"
                      checked={selectedGender === "woman"}
                      onChange={() => handleRadioBoxChange("woman")}
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
                  />
                  <div className="flex flex-col md:flex-row md:justify-between items-center justify-center gap-7">
                    <button
                      type="button"
                      onClick={handleClick}
                      className="w-full bg-red-600 hover:bg-red-500 md:w-48 text-white rounded-md border h-14 text-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full bg-cyan-800 hover:bg-cyan-600 md:w-48 text-white rounded-md border h-14 text-lg"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="mr-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <button
                  onClick={toggleSortOrder}
                  className="bg-blue-500 border duration-300 hover:scale-105 active:scale-95 hover:bg-blue-400 text-white font-medium px-3 py-1 rounded-md"
                >
                  Toggle Sort Order: {sortOrder === "ASC" ? "A-Z" : "Z-A"}
                </button>
              </div>
              <button onClick={handleSort} className="bg-blue-500 border duration-300 hover:scale-105 active:scale-95 hover:bg-blue-400 text-white font-medium px-3 py-1 rounded-md">Sort</button>
            </div>
          </div>
        </div>
      </div>

      {/* float Edit */}

      {isEditOpen && (
        <div className="floating-form absolute border-2 rounded-md bg-white p-5 w-1/3">
        <h1 className="text-black text-3xl text-center font-medium">Edit Form</h1>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full h-10 mt-4 p-6 rounded-md border"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your E-mail"
              className="w-full h-10 mt-4 p-6 rounded-md border"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter your Mobile No"
              className="w-full h-10 mt-4 p-6 rounded-md border"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <input
              type="text"
              placeholder="Enter your State"
              className="w-full h-10 mt-2 p-6 rounded-md border"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full h-10 mt-2 p-6 rounded-md border"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex flex-col md:flex-row md:justify-between items-center justify-center gap-7 mt-3">
              <button
                type="button"
                onClick={handleEdit}
                className="w-full bg-red-600 hover:bg-cyan-600 md:w-48 text-white rounded-md border h-14 text-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full bg-cyan-800 hover:bg-cyan-600 md:w-48 text-white rounded-md border h-14 text-lg"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {userList.map((user) => (
              <div className="p-4 lg:w-1/2 md:w-full" key={user._id}>
                <div className="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 flex-row sm:flex-col">
                  <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-10 h-10"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                      {user.name}
                    </h2>
                    <p className="leading-relaxed text-base font-medium">{user.email}</p>
                    <p className="leading-relaxed text-base font-medium">{user.mobile}</p>
                    <p className="leading-relaxed text-base font-medium">{user.gender}</p>
                    <p className="leading-relaxed text-base font-medium">{user.state}</p>
                    <div className="flex justify-between">
                      <button
                        onClick={() => {
                          handleEdit(user._id);
                        }}
                        className="w-1/3 bg-blue-600 hover:bg-cyan-600  text-white rounded-md border h-14 text-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                        className="float-right overflow-hidden w-1/3 bg-red-600 hover:bg-cyan-600 text-white rounded-md border h-14 text-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch('https://usercrud-three.vercel.app/api/dashboard');
  const data = await res.json();
  console.log(data);
  return {
    props: {
      users: data,
    },
  };
}
export default dashboard;
