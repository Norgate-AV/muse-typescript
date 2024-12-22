import { Timeline } from "../services/Timeline";
import type { Switcher } from "../../@types";

const MAX_OUTPUT = 16;
const MAX_LEVELS = 3;

const levels = new Map<number, string>([
    [1, "VIDEO"],
    [2, "AUDIO"],
    [3, "ALL"],
]);

export class Enova implements Switcher {
    private engine: Timeline;
    private busy: boolean = false;
    private output: number[][];
    private pending: boolean[][];

    constructor({ timeline }: { timeline: Muse.TimelineService }) {
        this.engine = new Timeline({ service: timeline, intervals: [100] });
        this.init();
    }

    public init(): void {
        this.output = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];

        this.pending = [
            [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ],
            [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ],
            [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ],
        ];

        context.log.info("Enova initialized");

        this.engine.onExpired.push(this.tick);
        this.engine.create();
    }

    private tick(_: Muse.TimelineEvent): void {
        if (this.busy) {
            return;
        }

        try {
            for (let i = 0; i < MAX_OUTPUT; i++) {
                for (let j = 0; j < MAX_LEVELS; j++) {
                    if (!this.pending[j][i] || this.busy) {
                        continue;
                    }

                    context.log.info(
                        `Switching ${this.output[j][i]} to ${i + 1}`,
                    );
                    // this.pending[j][i] = false;
                    // this.busy = true;
                    // this.send(this.getCommand(this.output[j][i], i + 1, j + 1));
                }
            }
        } catch (error) {
            // context.log.error(error);
            // this.engine.kill();
        }
    }

    public switch(input: number, output: number, level: number): void {
        context.log.info(
            `Switching ${input} to ${output}: ${levels.get(level)}`,
        );

        try {
            this.output[level - 1][output - 1] = input;
            this.pending[level - 1][output - 1] = true;

            context.log.info(`Pending: ${this.pending[level - 1][output - 1]}`);
            context.log.info(`Input: ${this.output[level - 1][output - 1]}`);
        } catch (error) {
            context.log.error(error);
        }

        context.log.info(`Pending: ${this.pending}`);
        context.log.info(`Output: ${this.output}`);
    }

    private getCommand(input: number, output: number, level: number): string {
        return `CL${levels.get(level)}I${input}O${output}`;
    }

    private send(payload: string): void {
        context.log.info(`Sending payload: ${payload}`);
        this.busy = false;
    }
}
