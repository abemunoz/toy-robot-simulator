import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

const directions = ["NORTH", "SOUTH", "EAST", "WEST"];

export default class SimulatorComponent extends Component {
  x = 0;
  y = 0;
  direction = "NORTH";
  validPlacement = false;
  @tracked output = "";

  @action
  parseInstructions() {
    let queue = this.instructions
      ? this.instructions.split("\n")
      : document.querySelector("textarea").value.split("\n");
    //added query selector to be able to run tests, otherwise not needed
    for (var i = 0; i < queue.length; i++) {
      console.log(queue[i]);
      if (
        queue[i].toUpperCase().includes("PLACE") &&
        this.placeRobot(queue[i])
      ) {
        queue.slice(i);
        break;
      }
    }
    if (this.validPlacement) {
      queue.shift();
      this.moveRobot(queue);
    } else {
      this.output = "No valid placement. Ignoring your commands.";
    }
  }

  moveRobot(queue) {
    while (queue.length > 0 && queue[0].toUpperCase() !== "REPORT") {
      let command = queue.shift().trim().toUpperCase();
      if (command === "MOVE") {
        switch (this.direction) {
          case "NORTH":
            if (this.y < 4) {
              this.y++;
            }
            break;
          case "SOUTH":
            if (this.y > 1) {
              this.y--;
            }
            break;
          case "EAST":
            if (this.x < 4) {
              this.x++;
            }
            break;
          case "WEST":
            if (this.y < 4) {
              this.y++;
            }
            break;
        }
      } else if (command === "LEFT") {
        switch (this.direction) {
          case "NORTH":
            this.direction = "WEST";
            break;
          case "SOUTH":
            this.direction = "EAST";
            break;
          case "EAST":
            this.direction = "NORTH";
            break;
          case "WEST":
            this.direction = "SOUTH";
            break;
        }
      } else if (command === "RIGHT") {
        switch (this.direction) {
          case "NORTH":
            this.direction = "EAST";
            break;
          case "SOUTH":
            this.direction = "WEST";
            break;
          case "EAST":
            this.direction = "SOUTH";
            break;
          case "WEST":
            this.direction = "NORTH";
            break;
        }
      } else if (command.includes("PLACE")) {
        this.placeRobot(command);
      }
    }
    this.output = `Output: ${this.x},${this.y},${this.direction}`;
  }

  placeRobot(placement) {
    let xyDirection = placement.substring(placement.indexOf(" ") + 1);
    let coordinates = xyDirection.split(",");
    let x, y, direction;
    if (coordinates.length === 3) {
      [x, y, direction] = coordinates;
    } else {
      return false;
    }
    if (directions.includes(direction) && x >= 0 && x < 5 && y >= 0 && y < 5) {
      [this.x, this.y, this.direction] = coordinates;
      this.validPlacement = true;
      return true;
    } else {
      return false;
    }
  }
}
