/************************************************************************
*
*			Date 对象的扩展
*
**************************************************************************/
Date.prototype.Format = function(a) {
    var d = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    };
    /(y+)/.test(a) && (a = a.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var b in d)
        (new RegExp("(" + b + ")")).test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? d[b] : ("00" + d[b]).substr(("" + d[b]).length)));
    return a
};
Date.prototype.DateAdd = function(a, d) {
    d = parseInt(d);
    var b = new Date(this.getTime());
    switch (a) {
    case "y":
        b.setFullYear(this.getFullYear() + d);
        break;
    case "m":
        b.setMonth(this.getMonth() + d);
        break;
    case "d":
        b.setDate(this.getDate() + d);
        break;
    case "w":
        b.setDate(this.getDate() + 7 * d);
        break;
    case "h":
        b.setHours(this.getHours() + d);
        break;
    case "n":
        b.setMinutes(this.getMinutes() + d);
        break;
    case "s":
        b.setSeconds(this.getSeconds() + d);
        break;
    case "l":
        b.setMilliseconds(this.getMilliseconds() + d)
    }
    return b
};
Date.prototype.getWeekOfYear = function(a) {
    a = (a || 0) - 0;
    if (isNaN(a) || 6 < a)
        a = 0;
    var d = this.getFullYear()
      , b = new Date(d,0,1);
    a = 7 - b.getDay() + a;
    d = (new Date(d,this.getMonth(),this.getDate()) - b) / 864E5 + 1;
    return Math.ceil((d - a) / 7) + 1
};
Date.prototype.getWeekOfMonth = function(a) {
    a = (a || 0) - 0;
    if (isNaN(a) || 6 < a)
        a = 0;
    var d = this.getDay()
      , b = this.getDate();
    return Math.ceil((b - d - 1) / 7) + (d >= a ? 1 : 0)
};
Date.prototype.getSysWeek = function () {
	const now = new Date().getDay()
	return (
		'周' + ['日', '一', '二', '三', '四', '五', '六'][now]
	)
  }