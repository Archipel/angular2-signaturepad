'use strict';
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var SignaturePad = (function () {
    function SignaturePad(elementRef) {
        this.changed = new Array();
        this.touched = new Array();
        // no op
        this.elementRef = elementRef;
        this.options = this.options || {};
        this.onBeginEvent = new core_1.EventEmitter();
        this.onEndEvent = new core_1.EventEmitter();
    }
    SignaturePad.prototype.ngAfterContentInit = function () {
        var sp = require('signature_pad')['default'];
        var canvas = this.elementRef.nativeElement.querySelector('canvas');
        if (this.options['canvasHeight']) {
            canvas.height = this.options['canvasHeight'];
        }
        if (this.options['canvasWidth']) {
            canvas.width = this.options['canvasWidth'];
        }
        this.signaturePad = new sp(canvas, this.options);
        this.signaturePad.onBegin = this.onBegin.bind(this);
        this.signaturePad.onEnd = this.onEnd.bind(this);
    };
    SignaturePad.prototype.resizeCanvas = function () {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        var canvas = this.signaturePad._canvas;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    };
    // Returns signature image as an array of point groups
    SignaturePad.prototype.toData = function () {
        return this.signaturePad.toData();
    };
    // Draws signature image from an array of point groups
    SignaturePad.prototype.fromData = function (points) {
        this.signaturePad.fromData(points);
    };
    // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
    SignaturePad.prototype.toDataURL = function (imageType, quality) {
        return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
    };
    // Draws signature image from data URL
    SignaturePad.prototype.fromDataURL = function (dataURL, options) {
        if (options === void 0) { options = {}; }
        this.signaturePad.fromDataURL(dataURL, options);
    };
    // Clears the canvas
    SignaturePad.prototype.clear = function () {
        this.signaturePad.clear();
    };
    // Returns true if canvas is empty, otherwise returns false
    SignaturePad.prototype.isEmpty = function () {
        return this.signaturePad.isEmpty();
    };
    // Unbinds all event handlers
    SignaturePad.prototype.off = function () {
        this.signaturePad.off();
    };
    // Rebinds all event handlers
    SignaturePad.prototype.on = function () {
        this.signaturePad.on();
    };
    // set an option on the signaturePad - e.g. set('minWidth', 50);
    SignaturePad.prototype.set = function (option, value) {
        switch (option) {
            case 'canvasHeight':
                this.signaturePad._canvas.height = value;
                break;
            case 'canvasWidth':
                this.signaturePad._canvas.width = value;
                break;
            default:
                this.signaturePad[option] = value;
        }
    };
    // notify subscribers on signature begin
    SignaturePad.prototype.onBegin = function () {
        this.onBeginEvent.emit(true);
        this.touch();
    };
    // notify subscribers on signature end
    SignaturePad.prototype.onEnd = function () {
        this.onEndEvent.emit(true);
        this.callOnChange();
    };
    SignaturePad.prototype.queryPad = function () {
        return this.signaturePad;
    };
    SignaturePad.prototype.registerOnChange = function (fn) {
        this.changed.push(fn);
    };
    SignaturePad.prototype.registerOnTouched = function (fn) {
        this.touched.push(fn);
    };
    SignaturePad.prototype.callOnChange = function () {
        var _this = this;
        this.changed.forEach(function (f) { return f(_this.value); });
    };
    SignaturePad.prototype.touch = function () {
        this.touched.forEach(function (f) { return f(); });
    };
    SignaturePad.prototype.writeValue = function (value) {
        this.value = value;
    };
    Object.defineProperty(SignaturePad.prototype, "value", {
        get: function () {
            if (this.signaturePad && !this.isEmpty()) {
                return this.toDataURL();
            }
            else {
                return '';
            }
        },
        set: function (val) {
            if (val == '') {
                this.clear();
            }
            else {
                this.fromDataURL(val);
            }
            this.callOnChange();
        },
        enumerable: true,
        configurable: true
    });
    SignaturePad.decorators = [
        { type: core_1.Component, args: [{
                    template: '<canvas></canvas>',
                    selector: 'signature-pad',
                    providers: [{
                            provide: forms_1.NG_VALUE_ACCESSOR,
                            multi: true,
                            useExisting: SignaturePad,
                        }],
                },] },
    ];
    /** @nocollapse */
    SignaturePad.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    SignaturePad.propDecorators = {
        'options': [{ type: core_1.Input },],
        'onBeginEvent': [{ type: core_1.Output },],
        'onEndEvent': [{ type: core_1.Output },],
    };
    return SignaturePad;
}());
exports.SignaturePad = SignaturePad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLXBhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ25hdHVyZS1wYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIscUJBQW1FLGVBQWUsQ0FBQyxDQUFBO0FBQ25GLHNCQUFzRCxnQkFBZ0IsQ0FBQyxDQUFBO0FBY3ZFO0lBWUUsc0JBQVksVUFBc0I7UUFIMUIsWUFBTyxHQUFRLElBQUksS0FBSyxFQUF3QixDQUFDO1FBQ2pELFlBQU8sR0FBUSxJQUFJLEtBQUssRUFBYyxDQUFDO1FBRzdDLFFBQVE7UUFDUixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0seUNBQWtCLEdBQXpCO1FBQ0UsSUFBSSxFQUFFLEdBQVEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksTUFBTSxHQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4RSxFQUFFLENBQUMsQ0FBTyxJQUFJLENBQUMsT0FBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsTUFBTSxHQUFTLElBQUksQ0FBQyxPQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFPLElBQUksQ0FBQyxPQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxLQUFLLEdBQVMsSUFBSSxDQUFDLE9BQVEsQ0FBQyxhQUFhLENBQUMsQ0FB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QU0sRUFBRSxFQUFFO0tBQ2hDLENBQUM7SUFDRixtQkFBQztBQUFELENBQUMsQUFsTEQsSUFrTEM7QUFsTFksb0JBQVksZUFrTHhCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgdGltZTogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBQb2ludEdyb3VwID0gQXJyYXk8UG9pbnQ+O1xuXG5cblxuZXhwb3J0IGNsYXNzIFNpZ25hdHVyZVBhZCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcblxuICAgcHVibGljIG9wdGlvbnM6IE9iamVjdDtcbiAgIHB1YmxpYyBvbkJlZ2luRXZlbnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcbiAgIHB1YmxpYyBvbkVuZEV2ZW50OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG5cbiAgcHJpdmF0ZSBzaWduYXR1cmVQYWQ6IGFueTtcbiAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgY2hhbmdlZDogYW55ID0gbmV3IEFycmF5PCh2YWx1ZTogYW55KSA9PiB2b2lkPigpO1xuICBwcml2YXRlIHRvdWNoZWQ6IGFueSA9IG5ldyBBcnJheTwoKSA9PiB2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAvLyBubyBvcFxuICAgIHRoaXMuZWxlbWVudFJlZiA9IGVsZW1lbnRSZWY7XG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5vcHRpb25zIHx8IHt9O1xuICAgIHRoaXMub25CZWdpbkV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXMub25FbmRFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgbGV0IHNwOiBhbnkgPSByZXF1aXJlKCdzaWduYXR1cmVfcGFkJylbJ2RlZmF1bHQnXTtcbiAgICBsZXQgY2FudmFzOiBhbnkgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcblxuICAgIGlmICgoPGFueT50aGlzLm9wdGlvbnMpWydjYW52YXNIZWlnaHQnXSkge1xuICAgICAgY2FudmFzLmhlaWdodCA9ICg8YW55PnRoaXMub3B0aW9ucylbJ2NhbnZhc0hlaWdodCddO1xuICAgIH1cblxuICAgIGlmICgoPGFueT50aGlzLm9wdGlvbnMpWydjYW52YXNXaWR0aCddKSB7XG4gICAgICBjYW52YXMud2lkdGggPSAoPGFueT50aGlzLm9wdGlvbnMpWydjYW52YXNXaWR0aCddO1xuICAgIH1cblxuICAgIHRoaXMuc2lnbmF0dXJlUGFkID0gbmV3IHNwKGNhbnZhcywgdGhpcy5vcHRpb25zKTtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5vbkJlZ2luID0gdGhpcy5vbkJlZ2luLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQub25FbmQgPSB0aGlzLm9uRW5kLmJpbmQodGhpcyk7XG4gIH1cblxuICBwdWJsaWMgcmVzaXplQ2FudmFzKCk6IHZvaWQge1xuICAgIC8vIFdoZW4gem9vbWVkIG91dCB0byBsZXNzIHRoYW4gMTAwJSwgZm9yIHNvbWUgdmVyeSBzdHJhbmdlIHJlYXNvbixcbiAgICAvLyBzb21lIGJyb3dzZXJzIHJlcG9ydCBkZXZpY2VQaXhlbFJhdGlvIGFzIGxlc3MgdGhhbiAxXG4gICAgLy8gYW5kIG9ubHkgcGFydCBvZiB0aGUgY2FudmFzIGlzIGNsZWFyZWQgdGhlbi5cbiAgICBjb25zdCByYXRpbzogbnVtYmVyID0gTWF0aC5tYXgod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSwgMSk7XG4gICAgY29uc3QgY2FudmFzOiBhbnkgPSB0aGlzLnNpZ25hdHVyZVBhZC5fY2FudmFzO1xuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy5vZmZzZXRXaWR0aCAqIHJhdGlvO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMub2Zmc2V0SGVpZ2h0ICogcmF0aW87XG4gICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuc2NhbGUocmF0aW8sIHJhdGlvKTtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5jbGVhcigpOyAvLyBvdGhlcndpc2UgaXNFbXB0eSgpIG1pZ2h0IHJldHVybiBpbmNvcnJlY3QgdmFsdWVcbiAgfVxuXG4gICAvLyBSZXR1cm5zIHNpZ25hdHVyZSBpbWFnZSBhcyBhbiBhcnJheSBvZiBwb2ludCBncm91cHNcbiAgcHVibGljIHRvRGF0YSgpOiBBcnJheTxQb2ludEdyb3VwPiB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlUGFkLnRvRGF0YSgpO1xuICB9XG5cbiAgLy8gRHJhd3Mgc2lnbmF0dXJlIGltYWdlIGZyb20gYW4gYXJyYXkgb2YgcG9pbnQgZ3JvdXBzXG4gIHB1YmxpYyBmcm9tRGF0YShwb2ludHM6IEFycmF5PFBvaW50R3JvdXA+KTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuZnJvbURhdGEocG9pbnRzKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgc2lnbmF0dXJlIGltYWdlIGFzIGRhdGEgVVJMIChzZWUgaHR0cHM6Ly9tZG4uaW8vdG9kYXRhdXJsIGZvciB0aGUgbGlzdCBvZiBwb3NzaWJsZSBwYXJhbXRlcnMpXG4gIHB1YmxpYyB0b0RhdGFVUkwoaW1hZ2VUeXBlPzogc3RyaW5nLCBxdWFsaXR5PzogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQudG9EYXRhVVJMKGltYWdlVHlwZSwgcXVhbGl0eSk7IC8vIHNhdmUgaW1hZ2UgYXMgZGF0YSBVUkxcbiAgfVxuXG4gIC8vIERyYXdzIHNpZ25hdHVyZSBpbWFnZSBmcm9tIGRhdGEgVVJMXG4gIHB1YmxpYyBmcm9tRGF0YVVSTChkYXRhVVJMOiBzdHJpbmcsIG9wdGlvbnM6IE9iamVjdCA9IHt9KTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuZnJvbURhdGFVUkwoZGF0YVVSTCwgb3B0aW9ucyk7XG4gIH1cblxuICAvLyBDbGVhcnMgdGhlIGNhbnZhc1xuICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQuY2xlYXIoKTtcbiAgfVxuXG4gIC8vIFJldHVybnMgdHJ1ZSBpZiBjYW52YXMgaXMgZW1wdHksIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXG4gIHB1YmxpYyBpc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZC5pc0VtcHR5KCk7XG4gIH1cblxuICAvLyBVbmJpbmRzIGFsbCBldmVudCBoYW5kbGVyc1xuICBwdWJsaWMgb2ZmKCk6IHZvaWQge1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9mZigpO1xuICB9XG5cbiAgLy8gUmViaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnNcbiAgcHVibGljIG9uKCk6IHZvaWQge1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9uKCk7XG4gIH1cblxuICAvLyBzZXQgYW4gb3B0aW9uIG9uIHRoZSBzaWduYXR1cmVQYWQgLSBlLmcuIHNldCgnbWluV2lkdGgnLCA1MCk7XG4gIHB1YmxpYyBzZXQob3B0aW9uOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiB2b2lkIHtcblxuICAgIHN3aXRjaCAob3B0aW9uKSB7XG4gICAgICBjYXNlICdjYW52YXNIZWlnaHQnOlxuICAgICAgICB0aGlzLnNpZ25hdHVyZVBhZC5fY2FudmFzLmhlaWdodCA9IHZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NhbnZhc1dpZHRoJzpcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQYWQuX2NhbnZhcy53aWR0aCA9IHZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuc2lnbmF0dXJlUGFkW29wdGlvbl0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvLyBub3RpZnkgc3Vic2NyaWJlcnMgb24gc2lnbmF0dXJlIGJlZ2luXG4gIHB1YmxpYyBvbkJlZ2luKCk6IHZvaWQge1xuICAgIHRoaXMub25CZWdpbkV2ZW50LmVtaXQodHJ1ZSk7XG4gICAgdGhpcy50b3VjaCgpO1xuICB9XG5cbiAgLy8gbm90aWZ5IHN1YnNjcmliZXJzIG9uIHNpZ25hdHVyZSBlbmRcbiAgcHVibGljIG9uRW5kKCk6IHZvaWQge1xuICAgIHRoaXMub25FbmRFdmVudC5lbWl0KHRydWUpO1xuICAgIHRoaXMuY2FsbE9uQ2hhbmdlKCk7XG4gIH1cblxuICBwdWJsaWMgcXVlcnlQYWQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQ7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLmNoYW5nZWQucHVzaChmbik7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnRvdWNoZWQucHVzaChmbik7XG4gIH1cblxuICBwdWJsaWMgY2FsbE9uQ2hhbmdlKCkge1xuICAgIHRoaXMuY2hhbmdlZC5mb3JFYWNoKGYgPT4gZih0aGlzLnZhbHVlKSk7XG4gIH1cblxuICBwdWJsaWMgdG91Y2goKSB7XG4gICAgdGhpcy50b3VjaGVkLmZvckVhY2goZiA9PiBmKCkpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIGlmKHRoaXMuc2lnbmF0dXJlUGFkICYmICF0aGlzLmlzRW1wdHkoKSl7XG4gICAgICByZXR1cm4gdGhpcy50b0RhdGFVUkwoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICBzZXQgdmFsdWUodmFsOiBzdHJpbmcpIHtcbiAgICBpZih2YWwgPT0gJycpe1xuICAgICAgdGhpcy5jbGVhcigpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgdGhpcy5mcm9tRGF0YVVSTCh2YWwpO1xuICAgIH1cbiAgICB0aGlzLmNhbGxPbkNoYW5nZSgpO1xuICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XG4gIHRlbXBsYXRlOiAnPGNhbnZhcz48L2NhbnZhcz4nLFxuICBzZWxlY3RvcjogJ3NpZ25hdHVyZS1wYWQnLFxuICBwcm92aWRlcnM6IFt7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgdXNlRXhpc3Rpbmc6IFNpZ25hdHVyZVBhZCxcbiAgfV0sXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidvcHRpb25zJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29uQmVnaW5FdmVudCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25FbmRFdmVudCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG59O1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=