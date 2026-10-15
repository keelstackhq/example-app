import { render } from "preact";
import { expect, test } from "vite-plus/test";
import { Button } from "./button";

test("renders a cascivo button with its label", () => {
  const root = document.createElement("div");
  document.body.append(root);
  render(<Button label="Save" />, root);
  expect(root.querySelector("button")?.textContent).toBe("Save");
});

test("exposes the label as a title when children are given", () => {
  const root = document.createElement("div");
  document.body.append(root);
  render(<Button label="Save">💾</Button>, root);
  const button = root.querySelector("button");
  expect(button?.title).toBe("Save");
  expect(button?.textContent).toBe("💾");
  expect(button?.getAttribute("aria-label")).toBeNull();
});
