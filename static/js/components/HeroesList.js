const HeroesList = {
  oninit: vnode => vnode.attrs.User.getSavedHeroes(),

  view: vnode => {
    vnode.state.hasUnsavedChanges =
      vnode.attrs.User.heroes.some(hero => hero.unsaved) ||
      vnode.attrs.User.deletedHeroIds.length > 0;

    return [
      !vnode.attrs.User.heroes.length
        ? m(
            ".heroes-empty",
            "You haven't added any heroes to your squad yet, use the buttons above to get started"
          )
        : m(
            ".list",
            vnode.attrs.User.heroes.map((hero, index) => {
              return m(
                `.hero .hero--${hero.universe.name}`,
                m(`span.icon.icon--${hero.universe.name}`, hero.name),
                m(
                  "button.hero__delete",
                  {
                    onclick: () =>
                      vnode.attrs.User.deleteHero({ index, heroId: hero.pk })
                  },
                  "Remove"
                )
              );
            })
          ),
      m(
        ".actions",
        m(
          "button.cancel",
          {
            onclick: () => vnode.attrs.User.cancel(),
            disabled: !vnode.state.hasUnsavedChanges
          },
          "Cancel"
        ),
        m(
          "button.save",
          {
            onclick: () => vnode.attrs.User.save(),
            disabled: !vnode.state.hasUnsavedChanges
          },
          "Save Squad"
        )
      )
    ];
  }
};

export default HeroesList;
