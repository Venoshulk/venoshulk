export class Point {
    x: number
    y: number
    value: number | null

    constructor(x: number, y: number, formula: Function | null = null) {
        this.x = x;
        this.y = y;
        this.value = formula ? formula(x, y) : null;
    }

    setX(x: number) {
        this.x = x;
        return this;
    }

    setY(y: number) {
        this.y = y;
        return this;
    }

    setValue(value: number) {
        this.value = value;
        return this;
    }

    getInterpolatedPoint(point2: Point, factor: number) {
        let x = this.x + factor * Math.abs(this.x - point2.x);
        let y = this.y + factor * Math.abs(this.y - point2.y);
        return new Point(x, y);
    }
}

export default class MarchingSquare {
    static configurations = [
        [],
        [0, 3], // fixed
        [0, 1], // fixed
        [1, 3], // fixed
        [2, 3], //fixed
        [0, 2],
        [0, 3, 1, 2], // fixed
        [2, 1], // fixed
        [1, 2],
        [0, 1, 2, 3], // fixed
        [0, 2],
        [2, 3],
        [1, 3],
        [0, 1],
        [0, 3], // fixed
        []
    ]

    /**
     * Creates 2d lines out a set of 4 points, based on the marching squares algorithm
     * Src: https://en.wikipedia.org/wiki/Marching_squares 
     * @param {*} points 4 equidistant points, forming a square. Points must be in this order: top left, top right, bottom left, bottom right.
     * @param {*} isolevel A constant value to compare the points' values to.
     * @returns An array containing pairs of points, which, when rendered together, produce a line.
     */
    static polygonise(points: Array<Point>, isolevel: number) {
        let configurationIndex = 0;

        if (points == null || points.length < 4)
            return [];
        // @ts-ignore: Object is possibly 'null'.
        if (points[0].value > isolevel) configurationIndex |= 1
        // @ts-ignore: Object is possibly 'null'.
        if (points[1].value > isolevel) configurationIndex |= 2
        // @ts-ignore: Object is possibly 'null'.
        if (points[2].value > isolevel) configurationIndex |= 4
        // @ts-ignore: Object is possibly 'null'.
        if (points[3].value > isolevel) configurationIndex |= 8

        if (configurationIndex === 15 || configurationIndex === 0)
            return [];

        let configuredPoints = [];
        for (let i = 0; i < MarchingSquare.configurations[configurationIndex].length; i++) {
            const edge = MarchingSquare.configurations[configurationIndex][i];
            if (edge === 0)
                configuredPoints.push(points[0].getInterpolatedPoint(points[1], 0.5));
            else if (edge === 1)
                configuredPoints.push(points[1].getInterpolatedPoint(points[3], 0.5));
            else if (edge === 2)
                configuredPoints.push(points[2].getInterpolatedPoint(points[3], 0.5));
            else if (edge === 3)
                configuredPoints.push(points[0].getInterpolatedPoint(points[2], 0.5));
        }

        return configuredPoints;
    }
}