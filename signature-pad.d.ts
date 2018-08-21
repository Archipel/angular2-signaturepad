import { ElementRef, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export interface Point {
    x: number;
    y: number;
    time: number;
}
export declare type PointGroup = Array<Point>;
export declare class SignaturePad implements ControlValueAccessor {
    options: Object;
    onBeginEvent: EventEmitter<boolean>;
    onEndEvent: EventEmitter<boolean>;
    private signaturePad;
    private elementRef;
    private changed;
    private touched;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    resizeCanvas(): void;
    toData(): Array<PointGroup>;
    fromData(points: Array<PointGroup>): void;
    toDataURL(imageType?: string, quality?: number): string;
    fromDataURL(dataURL: string, options?: Object): void;
    clear(): void;
    isEmpty(): boolean;
    off(): void;
    on(): void;
    set(option: string, value: any): void;
    onBegin(): void;
    onEnd(): void;
    queryPad(): any;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    callOnChange(): void;
    touch(): void;
    writeValue(value: any): void;
    value: string;
}
