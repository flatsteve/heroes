"use strict";

import { API_URL } from "../constants.js";

export default class User {
  constructor(data) {
    this.userId = data.pk;
    this.name = `${data.first_name} ${data.last_name}`;
    this.relations = data.relations;

    this.heroes = [];
    this.deletedHeroIds = [];
  }

  getSavedHeroes() {
    m.request({
      method: "GET",
      url: `${API_URL}/heroes/`
    }).then(results => {
      this.heroes = this.relations.map(relation =>
        results.find(hero => hero.pk === relation.hero)
      );
    });
  }

  addHero({ universe }) {
    m.request({
      method: "GET",
      url: `${API_URL}/heroes/random/?universe=${universe}`
    }).then(hero => {
      this.heroes.push({ ...hero, unsaved: true });
    });
  }

  deleteHero({ index, heroId }) {
    this.deletedHeroIds.push(heroId);
    this.heroes.splice(index, 1);
  }

  save() {
    const unsavedHeroes = this.heroes.filter(hero => hero.unsaved);
    const unsavedHeroIds = unsavedHeroes.map(hero => hero.pk);
    const deletedHeroIds = this.relations
      .filter(relation => this.deletedHeroIds.includes(relation.hero))
      .map(relation => relation.pk);

    m.request({
      method: "PATCH",
      url: `${API_URL}/users/${this.userId}/edit/`,
      data: {
        add: unsavedHeroIds,
        remove: deletedHeroIds
      }
    }).then(() => {
      unsavedHeroes.forEach(hero => {
        hero.unsaved = false;
      });
    });
  }

  cancel() {
    this.getSavedHeroes();
    this.deletedHeroIds = [];
  }
}
