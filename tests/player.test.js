import assert from "node:assert";
import test, { describe } from "node:test";
import { getAllPlayersDal } from "../DB/playerDB.js";
import dotenv from 'dotenv';

dotenv.config();

describe("player tests", () => {
    test("get all player tests", async () => {
        assert.strictEqual(typeof await getAllPlayersDal(), typeof []);
        assert.ok(Array.isArray(await getAllPlayersDal()));
        assert.strictEqual
    })
})