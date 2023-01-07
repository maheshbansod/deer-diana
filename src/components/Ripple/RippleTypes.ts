
export interface RippleConfig {
    position: RipplePosition;
    size: RippleSize;
}

type RipplePosition = {
    x: number;
    y: number;
};

type RippleSize = number;