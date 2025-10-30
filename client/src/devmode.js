function user(username = "", role = "normal") {
  if (!username) {
    username = "user" + Math.random().toString().split(".")[1];
  }
  if (username === "admin") {
    role = username;
  }
  return {
    username,
    role,
  };
}
const admin = "admin";
const fakeUsers = [user("admin"), user()];
function devmode(id = 0) {
  const user = fakeUsers[id];
  return { name: user.username, admin: user.role === admin ? true : false };
}
export default devmode;
