"use strict";

class ColorConverter {
    rgb2hsl(color) {
        const rgb = Object.assign({}, color);
        // 0..1 に変換
        rgb.r /= 255;
        rgb.g /= 255;
        rgb.b /= 255;
        const max = Math.max(Math.max(rgb.r, rgb.g), rgb.b);
        const min = Math.min(Math.min(rgb.r, rgb.g), rgb.b);

        const clampH = h => {
            let re = h;
            while(re < 0) re += 360;
            return re;
        };

        // hue の計算
        // 0..360
        const h = clampH((max === min) ? 0
            : (max === rgb.r) ? 60 * (rgb.g - rgb.b) / (max - min) + 0
            : (max === rgb.g) ? (60 * (rgb.b - rgb.r) / (max - min)) + 120
            : (60 * (rgb.r - rgb.g) / (max - min)) + 240);

        // Lightness の計算
        // 0..1
        const l = (max + min) / 2;

        // Saturation の計算
        // 0..1
        const s = (max === min)
            ? 0
            : (l < 0.5)
                ? (max - min) / (max + min)
                : (max - min) / (2.0 - max - min);

        return {"h": h, "l": l * 100, "s": s * 100};// eslint-disable-line no-alert, object-shorthand
    }

    hls2rgb(color) {
        const hls = Object.assign({}, color);
        hls.l /= 100;
        hls.s /= 100;

        while(hls.h < 0) hls.h += 360;
        hls.h %= 360;

        // 特別な場合 saturation = 0
        if(hls.s == 0) {
            // → RGB は L に等しい
            hls.l = Math.round(hls.l * 255);
            return {"r": hls.l, "g": hls.l, "b": hls.l};
        }

        const m2 = (hls.l < 0.5) ? hls.l * (1 + hls.s) : hls.l + hls.s - hls.l * hls.s;
        const m1 = hls.l * 2 - m2;
        console.log(`m1: ${m1}, m2: ${m2}`);// eslint-disable-line no-alert, no-console
        let tmp = hls.h + 120;
        if(tmp > 360) tmp -= 360;

        const impl = c => (c < 60) ? m1 + (m2 - m1) * c / 60
            : (c < 180) ? m2
            : (c < 240) ? m1 + (m2 - m1) * (240 - c) / 60
            : m1;

        const r = impl((hls.h > (360 + 120)) ? (hls.h + 120) - 360 * ((hls.h + 120) / 360) : hls.h + 120);
        const g = impl(hls.h);
        const b = impl((hls.h < 120) ? hls.h + (360 - 120) : hls.h - 120);

        return {"r": Math.round(r * 255), "g": Math.round(g * 255), "b": Math.round(b * 255)};
    }

    hls2rgbkai(color) {
        const hls = Object.assign({}, color);
        hls.l /= 100;
        hls.s /= 100;

        if(hls.s == 0) {
            const l = Math.round(hls.l * 255);
            return {"r": l, "g": l, "b": l};
        }
        const h = hls.h / 60;
        const i = Math.floor(h);
        const f = h - i;
        const c = 2.0 * hls.s * ((hls.l < 0.5) ? hls.l : 1.0 - hls.l);
        const m = hls.l - c / 2.0;
        const p = c + m;

        // q = x + m
        const q = (i % 2 == 0)
            ? hls.l + c * (f - 0.5)
            : hls.l - c * (f - 0.5);

        let r;
        let g;
        let b;
        switch (i) {
        case 0:
            r = p;
            g = q;
            b = m;
            break;
        case 1:
            r = q;
            g = p;
            b = m;
            break;
        case 2:
            r = m;
            g = p;
            b = q;
            break;
        case 3:
            r = m;
            g = q;
            b = p;
            break;
        case 4:
            r = q;
            g = m;
            b = p;
            break;
        case 5:
        default:
            r = p;
            g = m;
            b = q;
            break;
        }

        return {"r": Math.round(r * 255), "g": Math.round(g * 255), "b": Math.round(b * 255)};
    }
}

module.exports = new ColorConverter();
