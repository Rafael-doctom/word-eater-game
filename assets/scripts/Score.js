'use strict';

class Score {
    #date;
    #hits;
    #percentage;

    constructor(date, hits, percentage) {
        this.#date = date;
        this.#hits = hits;
        this.#percentage = percentage;
    }

    get date() {
        return this.#date;
    }

    get hits() {
        return this.#hits;
    }

    get percentage() {
        return this.#percentage;
    }

    get stats() {
        return `
            <h3>Your stats</h3>
            <p>${this.#date}</p>
            <p>You fed me ${this.#hits} words</p>
            <p>You typed ${this.#percentage}% of the 90 words</p>
        `;
    }
}

export {Score};

