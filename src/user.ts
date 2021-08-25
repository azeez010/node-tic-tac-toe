let State = require("./states")

class User {
    constructor(public name?: string, public player?: typeof State ){}

    winMsg(){
        console.log(`${this.name} Won!!!`)
    }
}

module.exports = User