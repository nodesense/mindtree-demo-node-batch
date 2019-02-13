// BDD, spec - test specification 

// function under test
const chai = require('chai');
let should = chai.should();
let expect = chai.expect;


function add(a, b) { return a - b;}

describe ("Math Test Suite", () => {

    // it - test case
    it("add two positive numbers", () => {
        expect(add(1, 2)).to.eq(3);
    })

    it("add two negative numbers", () => {
        expect(add(-1, -2)).to.eq(-3);
    })
})