const decline = { name: "Forbidden" };
module.exports = function userCheck(userId, role, ownerId) {
  //syarat:
  //role admin bisa masuk
  //username tepat bisa masuk
  if (!(userId === ownerId || role === "Admin")) {
    throw decline;
  }
  return;
};
