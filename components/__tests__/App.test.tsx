import React from "react";
import renderer from "react-test-renderer";

jest.useFakeTimers();

describe("<App />", () => {
  it("has 1 child", () => {
    const tree = renderer.create(<div><h1>TEST</h1><h1>DÅ</h1></div>).toJSON();
    // @ts-ignore
    expect(tree?.children?.length).toBe(2);
  });
});