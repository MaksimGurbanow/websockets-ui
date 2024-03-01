import { Field, Ship } from "../../models/interfaces";

function addSurroundingCells(x: number, y: number, descriptor: Field, fieldLength: number): void {
  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  directions.forEach(([dx, dy]) => {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newY >= 0 && newX < fieldLength && newY < fieldLength) {
      descriptor.overCells?.push([newX, newY]);
    }
  });
}

export function createFields(ships: Ship[]): Field[][] {
  const fieldLength = 10;
  const field: Field[][] = Array.from({ length: fieldLength }, () =>
    Array.from({ length: fieldLength }, () => ({ empty: true, isAttacked: false })),
  );

  ships.forEach((ship) => {
    const shipDescriptor: Field = {
      empty: false,
      leftSide: ship.length,
      pastTheCells: [],
      shipTheCells: [],
      overCells: [],
      isAttacked: false,
    };

    for (let i = 0; i < ship.length; i++) {
      const x = ship.direction ? ship.position.x : ship.position.x + i;
      const y = ship.direction ? ship.position.y + i : ship.position.y;

      field[y][x] = shipDescriptor;
      shipDescriptor.shipTheCells.push([x, y]);

      if (i === 0 || i === ship.length - 1) {
        addSurroundingCells(x, y, shipDescriptor, fieldLength);
      }
    }
  });

  return field;
}