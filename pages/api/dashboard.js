import initDB from "@/helpers/initDB";
import users from "@/model/users";

initDB();
export default async function handler(req, res) {
  if (req.method === "GET") {
    await getAllUsers(req, res);
  } else if (req.method === "DELETE") {
    await deleteUser(req, res);
  } else if (req.method === "POST") {
    await updateUser(req, res);
  }
}

async function getAllUsers(req, res) {
  try {
    const result = await users.find();
    res.status(200).json(result);
    // console.log(result)
  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(req, res) {
  const { userId } = req.body;
  console.log(userId);
  try {
    await users.findByIdAndDelete({ _id: userId });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(req, res) {
  const { userId, Name, Email, Mobile, State, Password } = req.body;
  try {
    const user = await users.findOneAndUpdate(
      { _id: userId },
      {
        name: Name,
        email: Email,
        mobile: Mobile,
        state: State,
        password: Password,
      }
    );
    // console.log(user);

    res.status(201).json({ message: "Updated Successfully" });
  } catch (err) {
    console.log(err);
  }
}
