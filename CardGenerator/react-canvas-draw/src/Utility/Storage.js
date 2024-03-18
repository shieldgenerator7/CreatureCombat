"use strict";

import { backwardsCompatifyCreature, inflateCreature } from "../Data/Creature";

//2024-03-08: copied from StoryViewer

const storageName = "CreatureCombat_CardList";

class Storage {
    constructor() {
        this.storageName = "CreatureCombat_CardList";
        this.storage = {
            cardList: [],
        };
        this.entryCount = 0;
        this.loadStorage();
        this.saveStorage();
        let storage = this;
        let _saveStorage = this.saveStorage.bind(this);
        window.onbeforeunload = _saveStorage;
        window.onblur = _saveStorage;
        //TEST
        window.storage = this;
    }

    saveStorage() {
        let stringify = JSON.stringify(this.storage);
        localStorage.setItem(this.storageName, stringify);
    }

    loadStorage() {
        let content = localStorage.getItem(this.storageName);
        if (content == 'undefined') {
            content = null;
        }
        if (!content?.trim()) {
            content = null;
        }
        this.storage = JSON.parse(content) ?? this.storage;
        //
        this.storage.cardList.forEach(card => {
            inflateCreature(card);
            backwardsCompatifyCreature(card);
        });
    }

    get cardList() {
        return this.storage.cardList;
    }
    set cardList(value) {
        this.storage.cardList = value;
    }
}
export default Storage;
