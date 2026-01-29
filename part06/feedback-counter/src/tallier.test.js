import { describe, it, expect } from "vitest";
import deepFreeze from "deep-freeze";
import tallier from "./tallier";

describe("tallier", () => {
  it("returns initial state when action is unknown", () => {
    const state = {};
    const action = {
      type: "UNKNOWN",
    };
    const newState = tallier(deepFreeze(state), action);
    expect(newState).toEqual({});
  });

  it("returns initial state for init", () => {
    const state = undefined;
    const action = {
      type: "INIT",
    };
    const newState = tallier(state, action);
    expect(newState).toEqual({
      positive: 0,
      neutral: 0,
      negative: 0,
    });
  });

  it("increments positive count", () => {
    const state = {
      positive: 5,
      neutral: 3,
      negative: 1,
    };
    const action = {
      type: "POSITIVE",
    };
    const newState = tallier(deepFreeze(state), action);
    expect(newState).toEqual({
      positive: 6,
      neutral: 3,
      negative: 1,
    });
  });

  it("increments neutral count", () => {
    const state = {
      positive: 5,
      neutral: 3,
      negative: 1,
    };
    const action = {
      type: "NEUTRAL",
    };
    const newState = tallier(deepFreeze(state), action);
    expect(newState).toEqual({
      positive: 5,
      neutral: 4,
      negative: 1,
    });
  });

  it("increments negative count", () => {
    const state = {
      positive: 5,
      neutral: 3,
      negative: 1,
    };
    const action = {
      type: "NEGATIVE",
    };
    const newState = tallier(deepFreeze(state), action);
    expect(newState).toEqual({
      positive: 5,
      neutral: 3,
      negative: 2,
    });
  });

  it("resets to initial state", () => {
    const state = {
      positive: 5,
      neutral: 3,
      negative: 1,
    };
    const action = {
      type: "RESET",
    };
    const newState = tallier(deepFreeze(state), action);
    expect(newState).toEqual({
      positive: 0,
      neutral: 0,
      negative: 0,
    });
  });
});
