const faker = require("faker");
const url = require("./db");
const nano = require("nano")(url);
const db = nano.db.use("couch");

let newPerson = {
    from: 1,
    to: 10,

    [Symbol.asyncIterator]() {

        return {
            current: this.from,
            last: this.to,

            async next() {

                const res = await db.insert({
                    name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                    email: faker.internet.email(),
                    country: faker.address.country(),
                    phone: faker.phone.phoneNumber(),
                    date: faker.date.past(2),
                    "level": faker.random.arrayElement(["Beginner", "Elementary", "Intermediate", "Upper-Intermediate", "Advanced", "Proficiency"])
                });

                console.log(res);

                if (this.current <= this.last) {
                    return { done: false, value: this.current++ };
                } else {
                    return { done: true };
                }
            }
        };
    }
};

(async () => {

    for await (let value of newPerson) {
        console.log(value);
    }

})()