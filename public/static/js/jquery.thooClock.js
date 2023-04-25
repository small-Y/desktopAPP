import jQuery from "jquery";
(function(e) {
    e.fn.thooClock = function(v) {
        this.each(function() {
            function w(l, k) {
                var d, c, h, f, e, p, g, n, r, q;
                d = parseInt(m - b.size / 50, 10);
                c = m - b.size / 400;
                a.beginPath();
                a.arc(0, 0, c, 0, 360, !1);
                a.fillStyle = k;
                a.fill();
                for (c = 1; 60 >= c; c += 1)
                    h = Math.PI / 30 * c,
                    f = Math.sin(h),
                    e = Math.cos(h),
                    0 === c % 5 ? (a.lineWidth = parseInt(b.size / 50, 10),
                    h = f * (d - d / 9),
                    p = e * -(d - d / 9),
                    g = f * d,
                    n = e * -d,
                    f *= d - d / 4.2,
                    e *= -(d - d / 4.2),
                    r = c / 5,
                    a.textBaseline = "middle",
                    q = parseInt(b.size / 13, 10),
                    a.font = "100 " + q + "px helvetica",
                    q = a.measureText(r).width,
                    a.beginPath(),
                    a.fillStyle = l,
                    b.showNumerals && a.fillText(r, f - q / 2, e)) : (a.lineWidth = parseInt(b.size / 100, 10),
                    h = f * (d - d / 20),
                    p = e * -(d - d / 20),
                    g = f * d,
                    n = e * -d),
                    a.beginPath(),
                    a.strokeStyle = l,
                    a.lineCap = "round",
                    a.moveTo(h, p),
                    a.lineTo(g, n),
                    a.stroke();
                void 0 !== b.brandText && (a.font = "100 " + parseInt(b.size / 28, 10) + "px helvetica",
                d = a.measureText(b.brandText).width,
                a.fillText(b.brandText, -(d / 2), b.size / 6));
                void 0 !== b.brandText2 && (a.textBaseline = "middle",
                a.font = "100 " + parseInt(b.size / 44, 10) + "px helvetica",
                d = a.measureText(b.brandText2).width,
                a.fillText(b.brandText2, -(d / 2), b.size / 5))
            }
            function u(a) {
                12 <= a && (a -= 12);
                return a
            }
            function g(b) {
                a.beginPath();
                a.moveTo(0, 0);
                a.lineTo(0, -1 * b);
                a.stroke()
            }
            function x(l, c) {
                var d = m - b.size / 40;
                a.save();
                a.lineWidth = parseInt(b.size / 150, 10);
                a.lineCap = "round";
                a.strokeStyle = c;
                a.rotate(Math.PI / 180 * 6 * l);
                a.shadowColor = "rgba(0,0,0,.5)";
                a.shadowBlur = parseInt(b.size / 80, 10);
                a.shadowOffsetX = parseInt(b.size / 200, 10);
                a.shadowOffsetY = parseInt(b.size / 200, 10);
                g(d);
                a.beginPath();
                a.moveTo(0, 0);
                a.lineTo(0, d / 15);
                a.lineWidth = parseInt(b.size / 30, 10);
                a.stroke();
                a.beginPath();
                a.arc(0, 0, parseInt(b.size / 30, 10), 0, 360, !1);
                a.fillStyle = c;
                a.fill();
                a.restore()
            }
            function y(l, c) {
                var d = b.size / 2.2;
                a.save();
                a.lineWidth = parseInt(b.size / 50, 10);
                a.lineCap = "round";
                a.strokeStyle = c;
                a.rotate(Math.PI / 180 * 6 * l);
                a.shadowColor = "rgba(0,0,0,.5)";
                a.shadowBlur = parseInt(b.size / 50, 10);
                a.shadowOffsetX = parseInt(b.size / 250, 10);
                a.shadowOffsetY = parseInt(b.size / 250, 10);
                g(d);
                a.restore()
            }
            function z(l, c) {
                var d = b.size / 3;
                a.save();
                a.lineWidth = parseInt(b.size / 25, 10);
                a.lineCap = "round";
                a.strokeStyle = c;
                a.rotate(Math.PI / 180 * 30 * l);
                a.shadowColor = "rgba(0,0,0,.5)";
                a.shadowBlur = parseInt(b.size / 50, 10);
                a.shadowOffsetX = parseInt(b.size / 300, 10);
                a.shadowOffsetY = parseInt(b.size / 300, 10);
                g(d);
                a.restore()
            }
            function A(c, k, d) {
                var e = b.size / 2.4;
                a.save();
                a.lineWidth = parseInt(b.size / 30, 10);
                a.lineCap = "butt";
                a.strokeStyle = k;
                var h, f;
                void 0 !== c && (h = u(c.getHours()),
                f = c.getMinutes());
                c = parseInt(h, 10) + f / 60;
                a.rotate(Math.PI / 180 * 30 * c);
                a.shadowColor = "rgba(0,0,0,.5)";
                a.shadowBlur = parseInt(b.size / 55, 10);
                a.shadowOffsetX = parseInt(b.size / 300, 10);
                a.shadowOffsetY = parseInt(b.size / 300, 10);
                a.beginPath();
                a.moveTo(0, 0);
                a.lineTo(0, -1 * (e - b.size / 10));
                a.stroke();
                a.beginPath();
                a.strokeStyle = d;
                a.moveTo(0, -1 * (e - b.size / 10));
                a.lineTo(0, -1 * e);
                a.stroke();
                a.beginPath();
                a.arc(0, 0, parseInt(b.size / 24, 10), 0, 360, !1);
                a.fillStyle = k;
                a.fill();
                a.restore()
            }
            function B(a) {
                return "+0" !== a && "" !== a ? "+" === a.charAt(0) ? +a.charAt(1) : -a.charAt(1) : 0
            }
            function n(c, k) {
                var d, g, h, f, t, p;
                d = new Date;
                g = d.getSeconds();
                f = d.getMinutes();
                h = f + g / 60;
                d = d.getHours();
                t = u(d + B(b.hourCorrection)) + h / 60;
                a.clearRect(-m, -m, b.size, b.size);
                w(b.dialColor, b.dialBackgroundColor);
                void 0 !== b.alarmTime && A(b.alarmTime, b.alarmHandColor, b.alarmHandTipColor);
                z(t, b.hourHandColor);
                y(h, b.minuteHandColor);
                x(g, b.secondHandColor);
                k += 1;
                1 === k && (e(b).trigger("onEverySecond"),
                k = 0);
                void 0 !== b.alarmTime && (p = 3600 * b.alarmTime.getHours() + 60 * b.alarmTime.getMinutes() + b.alarmTime.getSeconds());
                3600 * d + 60 * f + g >= p && (c += 1);
                c <= b.alarmCount && 0 !== c && e(b).trigger("onAlarm");
                g = 1E3 - (new Date).getTime() % 1E3;
                setTimeout(function() {
                    n(c, k)
                }, g)
            }
            var c, a, b, m;
            c = e.extend({}, {
                size: 250,
                dialColor: "#000000",
                dialBackgroundColor: "transparent",
                secondHandColor: "#F3A829",
                minuteHandColor: "#222222",
                hourHandColor: "#222222",
                alarmHandColor: "#FFFFFF",
                alarmHandTipColor: "#026729",
                hourCorrection: "+0",
                alarmCount: 1,
                showNumerals: !0
            }, v);
            b = this;
            b.size = c.size;
            b.dialColor = c.dialColor;
            b.dialBackgroundColor = c.dialBackgroundColor;
            b.secondHandColor = c.secondHandColor;
            b.minuteHandColor = c.minuteHandColor;
            b.hourHandColor = c.hourHandColor;
            b.alarmHandColor = c.alarmHandColor;
            b.alarmHandTipColor = c.alarmHandTipColor;
            b.hourCorrection = c.hourCorrection;
            b.showNumerals = c.showNumerals;
            b.brandText = c.brandText;
            b.brandText2 = c.brandText2;
            b.alarmCount = c.alarmCount;
            b.alarmTime = c.alarmTime;
            b.onAlarm = c.onAlarm;
            b.offAlarm = c.offAlarm;
            b.onEverySecond = c.onEverySecond;
            c = document.createElement("canvas");
            a = c.getContext("2d");
            c.width = this.size;
            c.height = this.size;
            e(c).appendTo(b);
            m = parseInt(b.size / 2, 10);
            a.translate(m, m);
            e.fn.thooClock.setAlarm = function(a) {
                if (!(a instanceof Date)) {
                    var c = a.split(":");
                    a = new Date;
                    for (var d = 0; 3 > d; d++) {
                        c[d] = Math.floor(c[d]);
                        if (c[d] !== c[d] || 59 < c[d])
                            c[d] = 0;
                        0 == d && 23 < c[d] && (c[d] = 0)
                    }
                    a.setHours(c[0], c[1], c[2])
                }
                b.alarmTime = a
            }
            ;
            e.fn.thooClock.clearAlarm = function() {
                b.alarmTime = void 0;
                n(0, 0);
                e(b).trigger("offAlarm")
            }
            ;
            if (void 0 !== b.onAlarm)
                e(b).on("onAlarm", function(a) {
                    b.onAlarm();
                    a.preventDefault();
                    a.stopPropagation()
                });
            if (void 0 !== b.onEverySecond)
                e(b).on("onEverySecond", function(a) {
                    b.onEverySecond();
                    a.preventDefault()
                });
            if (void 0 !== b.offAlarm)
                e(b).on("offAlarm", function(a) {
                    b.offAlarm();
                    a.stopPropagation();
                    a.preventDefault()
                });
            n(0, 0)
        })
    }
}
)(jQuery);