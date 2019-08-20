const Profile = {
  view: vnode => {
    return m(".profile", vnode.attrs.name);
  }
};

export default Profile;
