import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { click, render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Component | simulator", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Simulator />`);

    assert.expect(0);
  });

  test("disregards invalid placement", async function (assert) {
    await render(hbs`<Simulator />`);

    this.element.querySelector("textarea").value = `PLACE 5,5,NORTH
    MOVE
    REPORT`;

    await click(".submit");

    assert.equal(
      this.element.querySelector("h2").textContent.trim(),
      "No valid placement. Ignoring your commands."
    );
  });

  test("disregards no placement", async function (assert) {
    await render(hbs`<Simulator />`);

    this.element.querySelector("textarea").value = `MOVE
    REPORT`;

    await click(".submit");

    assert.equal(
      this.element.querySelector("h2").textContent.trim(),
      "No valid placement. Ignoring your commands."
    );
  });

  test("moves robot one north", async function (assert) {
    await render(hbs`<Simulator />`);

    this.element.querySelector("textarea").value = `PLACE 0,0,NORTH
    MOVE
    REPORT`;

    await click(".submit");

    assert.equal(
      this.element.querySelector("h2").textContent.trim(),
      "Output: 0,1,NORTH"
    );
  });

  test("turns robot 90 degrees to the left", async function (assert) {
    await render(hbs`<Simulator />`);

    this.element.querySelector("textarea").value = `PLACE 0,0,NORTH
    LEFT
    REPORT`;

    await click(".submit");

    assert.equal(
      this.element.querySelector("h2").textContent.trim(),
      "Output: 0,0,WEST"
    );
  });

  test("moves and turns robot multiple times", async function (assert) {
    await render(hbs`<Simulator />`);

    this.element.querySelector("textarea").value = `PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    REPORT`;

    await click(".submit");

    assert.equal(
      this.element.querySelector("h2").textContent.trim(),
      "Output: 3,3,NORTH"
    );
  });

  test("accepts multiple robot placements", async function (assert) {
    await render(hbs`<Simulator />`);

    this.element.querySelector("textarea").value = `PLACE 1,2,EAST
    MOVE
    MOVE
    LEFT
    MOVE
    PLACE 0,0,NORTH
    LEFT
    REPORT`;

    await click(".submit");

    assert.equal(
      this.element.querySelector("h2").textContent.trim(),
      "Output: 0,0,WEST"
    );
  });

  test("does not allow robot to move off tabletop", async function (assert) {
    await render(hbs`<Simulator />`);

    this.element.querySelector("textarea").value = `PLACE 1,2,EAST
    MOVE
    MOVE
    MOVE
    MOVE
    MOVE
    MOVE
    LEFT
    MOVE
    MOVE
    MOVE
    MOVE
    MOVE
    MOVE
    MOVE
    MOVE
    MOVE
    REPORT`;

    await click(".submit");

    assert.equal(
      this.element.querySelector("h2").textContent.trim(),
      "Output: 4,4,NORTH"
    );
  });
});
