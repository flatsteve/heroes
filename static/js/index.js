"use strict";

import "./mithril.js";

import User from "./models/User.js";
import Profile from "./components/Profile.js";
import AddHeroes from "./components/AddHeroes.js";
import HeroesList from "./components/HeroesList.js";

let page = {
  oninit: vnode => {
    vnode.state.user = null;

    m.request("/users/").then(results => {
      vnode.state.user = new User(results[0]);
    });
  },

  view: vnode => {
    return m(
      ".app",
      !vnode.state.user
        ? m(".loading", "Loading your heroes")
        : [
            m(Profile, { name: vnode.state.user.name }),
            m(AddHeroes, { User: vnode.state.user }),
            m(HeroesList, { User: vnode.state.user })
          ]
    );
  }
};

m.mount(document.body, page);
