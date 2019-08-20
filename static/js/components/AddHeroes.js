const AddHeroes = {
  view: vnode => {
    return m(
      ".add-heroes",
      m(
        "button",
        { onclick: () => vnode.attrs.User.addHero({ universe: "DC" }) },
        m("span.icon.icon--dc", "Add DC Hero")
      ),
      m(
        "button",
        { onclick: () => vnode.attrs.User.addHero({ universe: "Marvel" }) },
        m("span.icon.icon--marvel", "Add Marvel Hero")
      )
    );
  }
};

export default AddHeroes;
