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
    };
    // notify subscribers on signature end
    SignaturePad.prototype.onEnd = function () {
        this.onEndEvent.emit(true);
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
    SignaturePad.prototype.writeValue = function (value) {
        this.value = value;
    };
    Object.defineProperty(SignaturePad.prototype, "value", {
        get: function () {
            return this.signaturePad.toDataUrl();
        },
        set: function (val) {
            this.signaturePad.fromDataUrl(val);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLXBhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ25hdHVyZS1wYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIscUJBQW1FLGVBQWUsQ0FBQyxDQUFBO0FBQ25GLHNCQUFzRCxnQkFBZ0IsQ0FBQyxDQUFBO0FBY3ZFO0lBWUUsc0JBQVksVUFBc0I7UUFIMUIsWUFBTyxHQUFRLElBQUksS0FBSyxFQUF3QixDQUFDO1FBQ2pELFlBQU8sR0FBUSxJQUFJLEtBQUssRUFBYyxDQUFDO1FBRzdDLFFBQVE7UUFDUixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0seUNBQWtCLEdBQXpCO1FBQ0UsSUFBSSxFQUFFLEdBQVEsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksTUFBTSxHQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV4RSxFQUFFLENBQUMsQ0FBTyxJQUFJLENBQUMsT0FBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsTUFBTSxHQUFTLElBQUksQ0FBQyxPQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFPLElBQUksQ0FBQyxPQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxLQUFLLEdBQVMsSUFBSSxDQUFDLE9BQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRCxDQUFDO1FBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxtQ0FBWSxHQUFuQjtRQUNFLG1FQUFtRTtRQUNuRSx1REFBdUQ7UUFDdkQsK0NBQStDO1FBQy9DLElBQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRSxJQUFNLE1BQU0sR0FBUSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztRQUM5QyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDNUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxtREFBbUQ7SUFDaEYsQ0FBQztJQUVBLHNEQUFzRDtJQUNoRCw2QkFBTSxHQUFiO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHNEQUFzRDtJQUMvQywrQkFBUSxHQUFmLFVBQWdCLE1BQXlCO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCx3R0FBd0c7SUFDakcsZ0NBQVMsR0FBaEIsVUFBaUIsU0FBa0IsRUFBRSxPQUFnQjtRQUNuRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMseUJBQXlCO0lBQ25GLENBQUM7SUFFRCxzQ0FBc0M7SUFDL0Isa0NBQVcsR0FBbEIsVUFBbUIsT0FBZSxFQUFFLE9BQW9CO1FBQXBCLHVCQUFvQixHQUFwQixZQUFvQjtRQUN0RCxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELG9CQUFvQjtJQUNiLDRCQUFLLEdBQVo7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCwyREFBMkQ7SUFDcEQsOEJBQU8sR0FBZDtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCw2QkFBNkI7SUFDdEIsMEJBQUcsR0FBVjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDZCQUE2QjtJQUN0Qix5QkFBRSxHQUFUO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsZ0VBQWdFO0lBQ3pELDBCQUFHLEdBQVYsVUFBVyxNQUFjLEVBQUUsS0FBVTtRQUVuQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxjQUFjO2dCQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUN6QyxLQUFLLENBQUM7WUFDUixLQUFLLGFBQWE7Z0JBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQztZQUNSO2dCQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3RDLENBQUM7SUFDSCxDQUFDO0lBRUQsd0NBQXdDO0lBQ2pDLDhCQUFPLEdBQWQ7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsc0NBQXNDO0lBQy9CLDRCQUFLLEdBQVo7UUFDRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sK0JBQVEsR0FBZjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFFTSx1Q0FBZ0IsR0FBdkIsVUFBd0IsRUFBd0I7UUFDOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVNLHdDQUFpQixHQUF4QixVQUF5QixFQUFjO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxpQ0FBVSxHQUFqQixVQUFrQixLQUFVO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxzQkFBSSwrQkFBSzthQUFUO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdkMsQ0FBQzthQUVELFVBQVUsR0FBVztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQyxDQUFDOzs7T0FKQTtJQUtJLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSxlQUFlO29CQUN6QixTQUFTLEVBQUUsQ0FBQzs0QkFDUixPQUFPLEVBQUUseUJBQWlCOzRCQUMxQixLQUFLLEVBQUUsSUFBSTs0QkFDWCxXQUFXLEVBQUUsWUFBWTt5QkFDNUIsQ0FBQztpQkFDSCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMkJBQWMsR0FBNkQ7UUFDbEYsRUFBQyxJQUFJLEVBQUUsaUJBQVUsR0FBRztLQUNuQixDQUFDO0lBQ0ssMkJBQWMsR0FBMkM7UUFDaEUsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDN0IsY0FBYyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBTSxFQUFFLEVBQUU7UUFDbkMsWUFBWSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBTSxFQUFFLEVBQUU7S0FDaEMsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQTdKRCxJQTZKQztBQTdKWSxvQkFBWSxlQTZKeEIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcblxuZXhwb3J0IGludGVyZmFjZSBQb2ludCB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB0aW1lOiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIFBvaW50R3JvdXAgPSBBcnJheTxQb2ludD47XG5cblxuXG5leHBvcnQgY2xhc3MgU2lnbmF0dXJlUGFkIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICBwdWJsaWMgb3B0aW9uczogT2JqZWN0O1xuICAgcHVibGljIG9uQmVnaW5FdmVudDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuICAgcHVibGljIG9uRW5kRXZlbnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICBwcml2YXRlIHNpZ25hdHVyZVBhZDogYW55O1xuICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBjaGFuZ2VkOiBhbnkgPSBuZXcgQXJyYXk8KHZhbHVlOiBhbnkpID0+IHZvaWQ+KCk7XG4gIHByaXZhdGUgdG91Y2hlZDogYW55ID0gbmV3IEFycmF5PCgpID0+IHZvaWQ+KCk7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgIC8vIG5vIG9wXG4gICAgdGhpcy5lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgfHwge307XG4gICAgdGhpcy5vbkJlZ2luRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy5vbkVuZEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICBsZXQgc3A6IGFueSA9IHJlcXVpcmUoJ3NpZ25hdHVyZV9wYWQnKVsnZGVmYXVsdCddO1xuICAgIGxldCBjYW52YXM6IGFueSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xuXG4gICAgaWYgKCg8YW55PnRoaXMub3B0aW9ucylbJ2NhbnZhc0hlaWdodCddKSB7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gKDxhbnk+dGhpcy5vcHRpb25zKVsnY2FudmFzSGVpZ2h0J107XG4gICAgfVxuXG4gICAgaWYgKCg8YW55PnRoaXMub3B0aW9ucylbJ2NhbnZhc1dpZHRoJ10pIHtcbiAgICAgIGNhbnZhcy53aWR0aCA9ICg8YW55PnRoaXMub3B0aW9ucylbJ2NhbnZhc1dpZHRoJ107XG4gICAgfVxuXG4gICAgdGhpcy5zaWduYXR1cmVQYWQgPSBuZXcgc3AoY2FudmFzLCB0aGlzLm9wdGlvbnMpO1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9uQmVnaW4gPSB0aGlzLm9uQmVnaW4uYmluZCh0aGlzKTtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5vbkVuZCA9IHRoaXMub25FbmQuYmluZCh0aGlzKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNpemVDYW52YXMoKTogdm9pZCB7XG4gICAgLy8gV2hlbiB6b29tZWQgb3V0IHRvIGxlc3MgdGhhbiAxMDAlLCBmb3Igc29tZSB2ZXJ5IHN0cmFuZ2UgcmVhc29uLFxuICAgIC8vIHNvbWUgYnJvd3NlcnMgcmVwb3J0IGRldmljZVBpeGVsUmF0aW8gYXMgbGVzcyB0aGFuIDFcbiAgICAvLyBhbmQgb25seSBwYXJ0IG9mIHRoZSBjYW52YXMgaXMgY2xlYXJlZCB0aGVuLlxuICAgIGNvbnN0IHJhdGlvOiBudW1iZXIgPSBNYXRoLm1heCh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxLCAxKTtcbiAgICBjb25zdCBjYW52YXM6IGFueSA9IHRoaXMuc2lnbmF0dXJlUGFkLl9jYW52YXM7XG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLm9mZnNldFdpZHRoICogcmF0aW87XG4gICAgY2FudmFzLmhlaWdodCA9IGNhbnZhcy5vZmZzZXRIZWlnaHQgKiByYXRpbztcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5zY2FsZShyYXRpbywgcmF0aW8pO1xuICAgIHRoaXMuc2lnbmF0dXJlUGFkLmNsZWFyKCk7IC8vIG90aGVyd2lzZSBpc0VtcHR5KCkgbWlnaHQgcmV0dXJuIGluY29ycmVjdCB2YWx1ZVxuICB9XG5cbiAgIC8vIFJldHVybnMgc2lnbmF0dXJlIGltYWdlIGFzIGFuIGFycmF5IG9mIHBvaW50IGdyb3Vwc1xuICBwdWJsaWMgdG9EYXRhKCk6IEFycmF5PFBvaW50R3JvdXA+IHtcbiAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQudG9EYXRhKCk7XG4gIH1cblxuICAvLyBEcmF3cyBzaWduYXR1cmUgaW1hZ2UgZnJvbSBhbiBhcnJheSBvZiBwb2ludCBncm91cHNcbiAgcHVibGljIGZyb21EYXRhKHBvaW50czogQXJyYXk8UG9pbnRHcm91cD4pOiB2b2lkIHtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5mcm9tRGF0YShwb2ludHMpO1xuICB9XG5cbiAgLy8gUmV0dXJucyBzaWduYXR1cmUgaW1hZ2UgYXMgZGF0YSBVUkwgKHNlZSBodHRwczovL21kbi5pby90b2RhdGF1cmwgZm9yIHRoZSBsaXN0IG9mIHBvc3NpYmxlIHBhcmFtdGVycylcbiAgcHVibGljIHRvRGF0YVVSTChpbWFnZVR5cGU/OiBzdHJpbmcsIHF1YWxpdHk/OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZC50b0RhdGFVUkwoaW1hZ2VUeXBlLCBxdWFsaXR5KTsgLy8gc2F2ZSBpbWFnZSBhcyBkYXRhIFVSTFxuICB9XG5cbiAgLy8gRHJhd3Mgc2lnbmF0dXJlIGltYWdlIGZyb20gZGF0YSBVUkxcbiAgcHVibGljIGZyb21EYXRhVVJMKGRhdGFVUkw6IHN0cmluZywgb3B0aW9uczogT2JqZWN0ID0ge30pOiB2b2lkIHtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5mcm9tRGF0YVVSTChkYXRhVVJMLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8vIENsZWFycyB0aGUgY2FudmFzXG4gIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5jbGVhcigpO1xuICB9XG5cbiAgLy8gUmV0dXJucyB0cnVlIGlmIGNhbnZhcyBpcyBlbXB0eSwgb3RoZXJ3aXNlIHJldHVybnMgZmFsc2VcbiAgcHVibGljIGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2lnbmF0dXJlUGFkLmlzRW1wdHkoKTtcbiAgfVxuXG4gIC8vIFVuYmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzXG4gIHB1YmxpYyBvZmYoKTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQub2ZmKCk7XG4gIH1cblxuICAvLyBSZWJpbmRzIGFsbCBldmVudCBoYW5kbGVyc1xuICBwdWJsaWMgb24oKTogdm9pZCB7XG4gICAgdGhpcy5zaWduYXR1cmVQYWQub24oKTtcbiAgfVxuXG4gIC8vIHNldCBhbiBvcHRpb24gb24gdGhlIHNpZ25hdHVyZVBhZCAtIGUuZy4gc2V0KCdtaW5XaWR0aCcsIDUwKTtcbiAgcHVibGljIHNldChvcHRpb246IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuXG4gICAgc3dpdGNoIChvcHRpb24pIHtcbiAgICAgIGNhc2UgJ2NhbnZhc0hlaWdodCc6XG4gICAgICAgIHRoaXMuc2lnbmF0dXJlUGFkLl9jYW52YXMuaGVpZ2h0ID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2FudmFzV2lkdGgnOlxuICAgICAgICB0aGlzLnNpZ25hdHVyZVBhZC5fY2FudmFzLndpZHRoID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQYWRbb3B0aW9uXSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdGlmeSBzdWJzY3JpYmVycyBvbiBzaWduYXR1cmUgYmVnaW5cbiAgcHVibGljIG9uQmVnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5vbkJlZ2luRXZlbnQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIC8vIG5vdGlmeSBzdWJzY3JpYmVycyBvbiBzaWduYXR1cmUgZW5kXG4gIHB1YmxpYyBvbkVuZCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uRW5kRXZlbnQuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIHB1YmxpYyBxdWVyeVBhZCgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZDtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuY2hhbmdlZC5wdXNoKGZuKTtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMudG91Y2hlZC5wdXNoKGZuKTtcbiAgfVxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQudG9EYXRhVXJsKCk7XG4gIH1cblxuICBzZXQgdmFsdWUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5mcm9tRGF0YVVybCh2YWwpO1xuICB9XG5zdGF0aWMgZGVjb3JhdG9yczogRGVjb3JhdG9ySW52b2NhdGlvbltdID0gW1xueyB0eXBlOiBDb21wb25lbnQsIGFyZ3M6IFt7XG4gIHRlbXBsYXRlOiAnPGNhbnZhcz48L2NhbnZhcz4nLFxuICBzZWxlY3RvcjogJ3NpZ25hdHVyZS1wYWQnLFxuICBwcm92aWRlcnM6IFt7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgdXNlRXhpc3Rpbmc6IFNpZ25hdHVyZVBhZCxcbiAgfV0sXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidvcHRpb25zJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29uQmVnaW5FdmVudCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25FbmRFdmVudCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG59O1xufVxuXG5pbnRlcmZhY2UgRGVjb3JhdG9ySW52b2NhdGlvbiB7XG4gIHR5cGU6IEZ1bmN0aW9uO1xuICBhcmdzPzogYW55W107XG59XG4iXX0=