import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Greeter__factory, Greeter } from "../typechain-types";

describe("Greater", () => {
    let user: SignerWithAddress;
    let greeter: Greeter;

    beforeEach(async () => {
        const accounts: SignerWithAddress[] = await ethers.getSigners();
        user = accounts[0];

        const Greeter: Greeter__factory = await ethers.getContractFactory(
            "Greeter",
        );
        greeter = await Greeter.deploy("Hello");
    });

    describe("Deployment", () => {
        it("Should deploy successfully", async () => {
            expect(await greeter.greet()).to.equal("Hello");
        });
    });

    describe("Set greeting", () => {
        it("Should set successfully", async () => {
            await greeter.connect(user).setGreeting("New hello");
            expect(await greeter.greet()).to.equal("New hello");
        });
    });
});
