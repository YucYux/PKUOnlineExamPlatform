/*
version:1.3
time:2021.09.28
author:zzs
*/
"use strict";
if (!window) var window = this;
try {
    var v = zzz.version;
} catch (e) {
    window.zzz = {};
}
zzz.version = 20210928;
if (!zzz.value) zzz.value = {};
if (zzz.inited) throw new Error("zzz re-init!");
//eval
zzz.eval = function (string) {
    return Function("'use strict';return " + string)();
};
//math
zzz.isInt = Number.isInteger ? Number.isInteger : function (number) {
    return number - 0 === Math.ceil(number);
};
zzz.equal = function (a, b) {
    return a === b;
};
zzz.equal.num = function (a, b) {
    return a - 0 === b - 0;
};
zzz.equal.type = function (obj, type) {
    type = type.toString().toLowerCase();
    if (type === "array" || type === "arr") {
        return obj instanceof Array;
    } else if (type === "element") {
        return obj instanceof Object && obj instanceof HTMLElement;
    } else if (type === "null") {
        return obj === null;
    } else if (type === "nan") {
        return isNaN(obj) && typeof obj == "number";
    } else if (type === "integer" || type === "int") {
        return typeof obj === "number" && zzz.isInt(obj);
    } else {
        return type === (typeof obj).toLowerCase();
    }
};
zzz.toNum = function (text) {
    var i = 0,
        j = 0,
        len = text.length,
        result = 0,
        isNegative = 0,
        isInt = 1;
    //find out if there is a number and if it is a negative.
    for (; i < len; i++) {
        if (text[i] === '-' && i < len - 1 && text[i + 1] <= '9' && text[i + 1] >= '0') {
            //suppose there is no whitespace between - and numbers
            isNegative = 1;
            i++;
            break;
        } else if (text[i] <= '9' && text[i] >= '0') break;
    }
    //as supposed, i should have been at the number's first position.
    if (i === len || text[i] > '9' || text[i] < '0') return NaN;
    else {
        //find out if it is an integer or not
        for (j = i; i < len; i++) {
            if (text[i] === '.') {
                isInt = 0;
            } else if (text[i] < '0' || text[i] > '9') break;
        }
        if (isInt) result = parseInt(text.substr(j, i - j));
        else result = parseFloat(text.substr(j, i - j));
        if (isNegative) result = 0 - result;
        return result;
    }
};
//random
zzz.random = function () {
    if (arguments.length === 0) return Math.random();
    else if (arguments.length === 1) {
        if (zzz.equal.type(arguments[0], "string")) return arguments[0][zzz.random.int(0, arguments[0].length - 1)];
        else if (zzz.equal.type(arguments[0], "array")) return zzz.random.array(arguments[0]);
        else if (zzz.equal.type(arguments[0], "object")) {
            var items = [];
            for (var i in arguments[0]) items.push(i);
            return zzz.random.array(items);
        }
    } else return zzz.random.array(arguments);
};
zzz.random.int = function (min_included, max_included) {
    if (max_included === min_included) return min_included;
    else if (max_included < min_included) {
        return zzz.random.int(max_included, min_included);
    }
    return Math.floor(min_included + (max_included - min_included + 1) * Math.random());
};
zzz.random.color = function (setting) {
    if (!setting) {
        console.log("zzz.random.color:no setting given.");
        setting = {};
    }
    let rgb = [0, 255, 0, 255, 0, 255];
    let isRGB = false,
        isHSL = false,
        isA = false;
    let hsl = [0, 255, 0, 255, 0, 255];
    let a = [0, 100]; //100x
    let index = 0;
    let i;
    for (i of ['r', 'g', 'b']) {
        let n = setting[i];
        if (n) {
            if (n[0]) rgb[index] = n[0];
            if (n.length > 1) rgb[index + 1] = n[1];
            isRGB = true;
        }
        index += 2;
    }
    index = 0;
    for (i of ['h', 's', 'l']) {
        let n = setting[i];
        if (n) {
            if (n[0]) hsl[index] = n[0];
            if (n.length > 1) hsl[index + 1] = n[1];
            isHSL = true;
        }
        index += 2;
    }
    i = 'a';
    let n = setting[i];
    if (n) {
        if (n[0]) a[0] = n[0];
        if (n.length > 1) a[1] = n[1];
        isA = true;
    }
    let sets;
    let rnd = "";
    let color = ""
    if (isRGB) {
        sets = rgb;
        rnd = "rgb";
    } else if (isHSL) {
        sets = hsl;
        rnd = "hsl";
    } else console.log("zzz.random.color:invalid param:{r,g,b,h,s,l,a[2]}", setting);
    for (i = 0; i < 6; i += 2) {
        color += zzz.random.int(sets[i], sets[i + 1]) + ','
    }
    if (isA) {
        rnd += "a";
        color += zzz.random.int(a[0], a[1]);
    } else color = color.substr(0, color.length - 1);
    return rnd + '(' + color + ')';
};
zzz.random.array = function (arr) {
    if (arr.length) return arr[zzz.random.int(0, arr.length - 1)];
    else return null;
};
zzz.random.string = function (len, dictionary) {
    if (!len) len = 10;
    var str = "";
    if (!dictionary) dictionary = zzz.value.validCharacter;
    for (var i = 0; i < len; i++) {
        str += zzz.random.array(dictionary);
    }
    return str;
};
zzz.appr = Math.round;
zzz.down = Math.floor;
zzz.up = Math.ceil;
zzz.abs = Math.abs;
//sort
zzz.algorithm = {
    sort: function (arr) {
        //TODO: sort(int[]),(int[],object[],key),sort(int[],swap object(int,int))
    },
    basicInterface: {
        compareTo: function (a, b) {
            return a < b;
        },
        swap: function (arr, a, b) {
            var c = arr[a];
            arr[a] = arr[b];
            arr[b] = c;
        }
    },
    sortAlgorithms: {
        insert: function (arr, start, end, compareTo, swap) {
            if (!compareTo) compareTo = zzz.algorithm.basicInterface.compareTo;
            if (!swap) swap = zzz.algorithm.basicInterface.swap;
            if (!start) start = 0;
            if (!end) end = arr.length;
            var i = start + 1,
                j = 0;
            for (; i < end; i++) {
                if (compareTo(arr[i], arr[i - 1])) {
                    for (j = i; j > 0; j--) {
                        if (compareTo(arr[j], arr[j - 1])) swap(arr, j, j - 1);
                    }
                }
            }
        },
        //recurring version
        //todo: complete this
        quick: function (arr, start, end, compareTo, swap) {
            if (!compareTo) compareTo = zzz.algorithm.basicInterface.compareTo;
            if (!swap) swap = zzz.algorithm.basicInterface.swap;
            if (!start) start = 0;
            if (!end) end = arr.length;
            //alter to insert sort.
            if (end - start < 10) {
                zzz.algorithm.sortAlgorithms.insert(arr, start, end, compareTo, swap);
                return;
            }
            var low = start + 1,
                high = end - 1,
                mid = (low >> 1) + (high >> 1) + (low & high) & 1;
            while (low <= high) {
                while (compareTo(arr[low], arr[0])) low++;
                while (compareTo(arr[0], arr[high])) high--;
                if (low < high) {}
            }
        },
        //recurring version
        merge: function (arr, start, end, compareTo, swap) {
            if (!compareTo) compareTo = zzz.algorithm.basicInterface.compareTo;
            if (!swap) swap = zzz.algorithm.basicInterface.swap;
            if (!start) start = 0;
            if (!end) end = arr.length;
            if (end - start < 2) return;
            else if (end - start === 2) {
                if (compareTo(arr[end - 1], arr[start])) swap(arr, start, end - 1);
                return;
            } else {
                var mid = (start >> 1) + (end >> 1) + (start & end & 1);
                zzz.algorithm.sortAlgorithms.merge(arr, start, mid);
                zzz.algorithm.sortAlgorithms.merge(arr, mid, end);
            }
            //sort
            var temp = new Array(end - start),
                i = start,
                j = mid,
                k = 0;
            while (i < mid && j < end) {
                if (compareTo(arr[j], arr[i])) temp[k++] = arr[j++];
                else temp[k++] = arr[i++];
            }
            while (i < mid) temp[k++] = arr[i++];
            while (j < end) temp[k++] = arr[j++];
            for (k--; k >= 0; k--) arr[k + start] = temp[k];
        }
    }
};
//code
//TODO : add UTF-8 to BASE64 encoding and decoding method. However, as JS saves string with coding UTF-16, it is very lengthy to convert UTF-8 to UTF-16 to base 64, vice versa. Therefore this function will be delayed.
//TODO : add SHA1 calculating method for UTF-8.
//current method:text(UTF-8)->uri(encoded)->BASE64
//difference between uri and path:uri doesn't change ":/" into "%XX" because he thinks it belongs to a uri.
zzz.en = function (data, type, setting) {
    if (!type) return data;
    type = type.toLowerCase();
    if (type == "base64") type = "b64";
    if (!zzz.code[type]) {
        this.console.log("no encoding method", type, "in zzz.code");
        return "";
    }
    return zzz.code[type].encode(data, setting);
}
zzz.de = function (data, type) {
    if (!type) return data;
    type = type.toLowerCase();
    if (type == "base64") type = "b64";
    else return zzz.code[type].decode(data);
}
zzz.code = {
    b64: {
        decode: function (base64code) {
            return window.atob(base64code);
        },
        encode: function (text) {
            return window.btoa(text);
        },
    },
    header: {
        encode: function (type, isBase64) {
            type = type.toLowerCase();
            const data = zzz.value.file;
            let mime = "";
            switch (type) {
                case "binary":
                    mime = data.encode("bin", "application")
                default:
                    mime = data.encode(type);
            }
            if (isBase64) mime += "data/base64;";
            return mime;
        }
    },
    url: {
        encode: function (text) {
            return window.encodeURI(text);
        },
        decode: function (url) {
            return window.decodeURI(url);
        }
    },
    path: {
        encode: function (text) {
            return window.encodeURIComponent(text);
        },
        decode: function (component) {
            return window.decodeURIComponent(component);
        }
    },
    //derived from https://github.com/blueimp/JavaScript-MD5/blob/master/js/md5.min.js
    //text,key1,key2
    md5: {
        encode: function (n, t, r) {
            let s = zzz.code.auxiliary;
            return t ? r ? s.k(t, n) : s.z(s.u(t, n)) : r ? s.o(n) : s.z(s.o(n));
        }
    },
    //derived from https://blog.csdn.net/qq_40164190/article/details/83384234
    sha256: {
        encode: function (data) {
            let s = zzz.code.auxiliary;
            for (let i in s.ihash_original) {
                s.ihash[i] = s.ihash_original[i];
            }
            for (let i in s.count) s.count[i] = 0;
            s.u(data, data.length);
            s.f();
            return s.hex();
        }
    },
    auxiliary: {
        safe_add: function (x, y) {
            var lsw = (x & 0xffff) + (y & 0xffff);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xffff);
        },
        b: function (n, t, r, e, o, u) {
            var c, z;
            return this.safe_add((c = this.safe_add(this.safe_add(t, n), this.safe_add(e, u))) << (z = o) | c >>> 32 - z, r);
        },
        l: function (n, t, r, e, o, u, c) {
            return this.b(t & r | ~t & e, n, t, o, u, c)
        },
        v: function (n, t, r, e, o, u, c) {
            return this.b(t & e | r & ~e, n, t, o, u, c)
        },
        g: function (n, t, r, e, o, u, c) {
            return this.b(t ^ r ^ e, n, t, o, u, c);
        },
        j: function (n, t, r, e, o, u, c) {
            return this.b(r ^ (t | ~e), n, t, o, u, c);
        },
        i: function (n, t) {
            var r, e, o, u;
            n[t >> 5] |= 128 << t % 32;
            n[14 + (t + 64 >>> 9 << 4)] = t;
            for (var c = 1732584193, f = -271733879, i = -1732584194, a = 271733878, h = 0; h < n.length; h += 16) {
                c = this.l(r = c, e = f, o = i, u = a, n[h], 7, -680876936);
                a = this.l(a, c, f, i, n[h + 1], 12, -389564586);
                i = this.l(i, a, c, f, n[h + 2], 17, 606105819);
                f = this.l(f, i, a, c, n[h + 3], 22, -1044525330);
                c = this.l(c, f, i, a, n[h + 4], 7, -176418897);
                a = this.l(a, c, f, i, n[h + 5], 12, 1200080426);
                i = this.l(i, a, c, f, n[h + 6], 17, -1473231341);
                f = this.l(f, i, a, c, n[h + 7], 22, -45705983);
                c = this.l(c, f, i, a, n[h + 8], 7, 1770035416);
                a = this.l(a, c, f, i, n[h + 9], 12, -1958414417);
                i = this.l(i, a, c, f, n[h + 10], 17, -42063);
                f = this.l(f, i, a, c, n[h + 11], 22, -1990404162);
                c = this.l(c, f, i, a, n[h + 12], 7, 1804603682);
                a = this.l(a, c, f, i, n[h + 13], 12, -40341101);
                i = this.l(i, a, c, f, n[h + 14], 17, -1502002290);
                c = this.v(c, f = this.l(f, i, a, c, n[h + 15], 22, 1236535329), i, a, n[h + 1], 5, -165796510);
                a = this.v(a, c, f, i, n[h + 6], 9, -1069501632);
                i = this.v(i, a, c, f, n[h + 11], 14, 643717713);
                f = this.v(f, i, a, c, n[h], 20, -373897302);
                c = this.v(c, f, i, a, n[h + 5], 5, -701558691);
                a = this.v(a, c, f, i, n[h + 10], 9, 38016083);
                i = this.v(i, a, c, f, n[h + 15], 14, -660478335);
                f = this.v(f, i, a, c, n[h + 4], 20, -405537848);
                c = this.v(c, f, i, a, n[h + 9], 5, 568446438);
                a = this.v(a, c, f, i, n[h + 14], 9, -1019803690);
                i = this.v(i, a, c, f, n[h + 3], 14, -187363961);
                f = this.v(f, i, a, c, n[h + 8], 20, 1163531501);
                c = this.v(c, f, i, a, n[h + 13], 5, -1444681467);
                a = this.v(a, c, f, i, n[h + 2], 9, -51403784);
                i = this.v(i, a, c, f, n[h + 7], 14, 1735328473);
                c = this.g(c, f = this.v(f, i, a, c, n[h + 12], 20, -1926607734), i, a, n[h + 5], 4, -378558);
                a = this.g(a, c, f, i, n[h + 8], 11, -2022574463);
                i = this.g(i, a, c, f, n[h + 11], 16, 1839030562);
                f = this.g(f, i, a, c, n[h + 14], 23, -35309556);
                c = this.g(c, f, i, a, n[h + 1], 4, -1530992060);
                a = this.g(a, c, f, i, n[h + 4], 11, 1272893353);
                i = this.g(i, a, c, f, n[h + 7], 16, -155497632);
                f = this.g(f, i, a, c, n[h + 10], 23, -1094730640);
                c = this.g(c, f, i, a, n[h + 13], 4, 681279174);
                a = this.g(a, c, f, i, n[h], 11, -358537222);
                i = this.g(i, a, c, f, n[h + 3], 16, -722521979);
                f = this.g(f, i, a, c, n[h + 6], 23, 76029189);
                c = this.g(c, f, i, a, n[h + 9], 4, -640364487);
                a = this.g(a, c, f, i, n[h + 12], 11, -421815835);
                i = this.g(i, a, c, f, n[h + 15], 16, 530742520);
                c = this.j(c, f = this.g(f, i, a, c, n[h + 2], 23, -995338651), i, a, n[h], 6, -198630844);
                a = this.j(a, c, f, i, n[h + 7], 10, 1126891415);
                i = this.j(i, a, c, f, n[h + 14], 15, -1416354905);
                f = this.j(f, i, a, c, n[h + 5], 21, -57434055);
                c = this.j(c, f, i, a, n[h + 12], 6, 1700485571);
                a = this.j(a, c, f, i, n[h + 3], 10, -1894986606);
                i = this.j(i, a, c, f, n[h + 10], 15, -1051523);
                f = this.j(f, i, a, c, n[h + 1], 21, -2054922799);
                c = this.j(c, f, i, a, n[h + 8], 6, 1873313359);
                a = this.j(a, c, f, i, n[h + 15], 10, -30611744);
                i = this.j(i, a, c, f, n[h + 6], 15, -1560198380);
                f = this.j(f, i, a, c, n[h + 13], 21, 1309151649);
                c = this.j(c, f, i, a, n[h + 4], 6, -145523070);
                a = this.j(a, c, f, i, n[h + 11], 10, -1120210379);
                i = this.j(i, a, c, f, n[h + 2], 15, 718787259);
                f = this.j(f, i, a, c, n[h + 9], 21, -343485551);
                c = this.safe_add(c, r);
                f = this.safe_add(f, e);
                i = this.safe_add(i, o);
                a = this.safe_add(a, u);
            }
            return [c, f, i, a];
        },
        a: function (n) {
            for (var t = "", r = 32 * n.length, e = 0; e < r; e += 8) t += String.fromCharCode(n[e >> 5] >>> e % 32 & 255);
            return t;
        },
        h: function (n) {
            var t = [];
            for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1) t[e] = 0;
            for (var r = 8 * n.length, e = 0; e < r; e += 8) t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32;
            return t;
        },
        z: function (n) {
            for (var t, r = "0123456789abcdef", e = "", o = 0; o < n.length; o += 1) {
                t = n.charCodeAt(o);
                e += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
            }
            return e;
        },
        o: function (n) {
            var t;
            return this.a(this.i(this.h(t = unescape(encodeURIComponent(n))), 8 * t.length));
        },
        k: function (n, t) {
            return function (n, t) {
                var r, e, o = this.h(n),
                    u = [],
                    c = [];
                for (u[15] = c[15] = void 0, 16 < o.length && (o = this.i(o, 8 * n.length)), r = 0; r < 16; r += 1) {
                    u[r] = 909522486 ^ o[r];
                    c[r] = 1549556828 ^ o[r];
                }
                return e = this.i(u.concat(this.h(t)), 512 + 8 * t.length), this.a(this.i(c.concat(e), 640))
            }(this.r(n), this.r(t));
        },
        r: function (n, x) {
            return ((x >>> n) | (x << (32 - n)));
        },
        c: function (x, y, z) {
            return ((x & y) ^ (~x & z));
        },
        m: function (x, y, z) {
            return ((x & y) ^ (x & z) ^ (y & z));
        },
        S0: function (x) {
            return (this.r(2, x) ^ this.r(13, x) ^ this.r(22, x));
        },
        S1: function (x) {
            return (this.r(6, x) ^ this.r(11, x) ^ this.r(25, x));
        },
        s0: function (x) {
            return (this.r(7, x) ^ this.r(18, x) ^ (x >>> 3));
        },
        s1: function (x) {
            return (this.r(17, x) ^ this.r(19, x) ^ (x >>> 10));
        },
        e: function (W, j) {
            return (W[j & 0x0f] += this.s1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] +
                this.s0(W[(j + 1) & 0x0f]));
        },
        K256: [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
            0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
            0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
            0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
            0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
            0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
            0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
            0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
            0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
            0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
            0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
            0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
            0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
            0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
            0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
            0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
        ],
        buffer: new Array(64),
        sha256_hex_digits: "0123456789abcdef",
        count_original: [0, 0],
        ihash_original: [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19],
        count: [0, 0],
        ihash: new Array(8),
        t: function () {
            var a, b, c, d, e, f, g, h, T1, T2;
            var W = new Array(16);
            a = this.ihash[0];
            b = this.ihash[1];
            c = this.ihash[2];
            d = this.ihash[3];
            e = this.ihash[4];
            f = this.ihash[5];
            g = this.ihash[6];
            h = this.ihash[7];
            for (var i = 0; i < 16; i++)
                W[i] = ((this.buffer[(i << 2) + 3]) | (this.buffer[(i << 2) + 2] << 8) | (this.buffer[(i << 2) + 1] <<
                    16) | (this.buffer[i << 2] << 24));

            for (var j = 0; j < 64; j++) {
                T1 = h + this.S1(e) + this.c(e, f, g) + this.K256[j];
                if (j < 16) T1 += W[j];
                else T1 += this.e(W, j);
                T2 = this.S0(a) + this.m(a, b, c);
                h = g;
                g = f;
                f = e;
                e = this.safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = this.safe_add(T1, T2);
            }
            this.ihash[0] += a;
            this.ihash[1] += b;
            this.ihash[2] += c;
            this.ihash[3] += d;
            this.ihash[4] += e;
            this.ihash[5] += f;
            this.ihash[6] += g;
            this.ihash[7] += h;
        },
        u: function (data, inputLen) {
            var i, index, curpos = 0;
            index = ((this.count[0] >> 3) & 0x3f);
            var remainder = (inputLen & 0x3f);
            if ((this.count[0] += (inputLen << 3)) < (inputLen << 3)) this.count[1]++;
            this.count[1] += (inputLen >> 29);
            for (i = 0; i + 63 < inputLen; i += 64) {
                for (var j = index; j < 64; j++)
                    this.buffer[j] = data.charCodeAt(curpos++);
                this.t();
                index = 0;
            }
            for (var j = 0; j < remainder; j++)
                this.buffer[j] = data.charCodeAt(curpos++);
        },
        f: function () {
            var index = ((this.count[0] >> 3) & 0x3f);
            this.buffer[index++] = 0x80;
            if (index <= 56) {
                for (var i = index; i < 56; i++)
                    this.buffer[i] = 0;
            } else {
                for (var i = index; i < 64; i++)
                    this.buffer[i] = 0;
                this.t();
                for (var i = 0; i < 56; i++)
                    this.buffer[i] = 0;
            }
            this.buffer[56] = (this.count[1] >>> 24) & 0xff;
            this.buffer[57] = (this.count[1] >>> 16) & 0xff;
            this.buffer[58] = (this.count[1] >>> 8) & 0xff;
            this.buffer[59] = this.count[1] & 0xff;
            this.buffer[60] = (this.count[0] >>> 24) & 0xff;
            this.buffer[61] = (this.count[0] >>> 16) & 0xff;
            this.buffer[62] = (this.count[0] >>> 8) & 0xff;
            this.buffer[63] = this.count[0] & 0xff;
            this.t();
        },
        /* Split the internal hash values into an array of bytes */
        byte: function () {
            var j = 0;
            var output = new Array(32);
            for (var i = 0; i < 8; i++) {
                output[j++] = ((this.ihash[i] >>> 24) & 0xff);
                output[j++] = ((this.ihash[i] >>> 16) & 0xff);
                output[j++] = ((this.ihash[i] >>> 8) & 0xff);
                output[j++] = (this.ihash[i] & 0xff);
            }
            return output;
        },
        hex: function () {
            var output = new String();
            for (var i = 0; i < 8; i++) {
                for (var j = 28; j >= 0; j -= 4)
                    output += this.sha256_hex_digits.charAt((this.ihash[i] >>> j) & 0x0f);
            }
            return output;
        }
    }
};
//time
class ztimeStructure {
    constructor(time) {
        this.year = time.year || 0;
        this.month = time.month || 0;
        this.day = time.day || 0;
        this.hour = time.hour || 0;
        this.minute = time.minute || 0;
        this.second = time.second || 0;
        this.milisecond = time.milisecond || 0;
        this.negative = time.negative || false;
    }
}
//TODO: seperate ztime from Date, especially rewrite subtract method.
zzz.time = {
    convertFromDate: function (date) {
        if (date instanceof Date) {
            var result = new ztimeStructure({
                second: date.getSeconds(),
                minute: date.getMinutes(),
                hour: date.getHours(),
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            });
            //console.log(date.getSeconds(), date.getMinutes(), date.getHours(), date.getDate(), date.getMonth(), date.getFullYear());
            return result;
        } else throw new Error("zzz.time.convertFromDate requires a Date.");
    },
    readDate: function (ztime) {
        if (ztime instanceof ztimeStructure) {
            var result = [0, 0, 0, 0, 0, 0];
            result[0] = ztime.second;
            result[1] = ztime.minute;
            result[2] = ztime.hour;
            result[3] = ztime.day;
            result[4] = ztime.month;
            result[5] = ztime.year;
            return result;
        } else throw new Error("zzz.time.readDate requires a ztimeStructure.");
    },
    convertToDate: function (ztime) {
        if (!(ztime instanceof ztimeStructure)) return;
        var result = new Date();
        result.setFullYear(ztime.year);
        result.setMonth(ztime.month - 1);
        result.setDate(ztime.day);
        result.setHours(ztime.hour);
        result.setMinutes(ztime.minute);
        result.setSeconds(ztime.second);
        return result;
    },
    now: function () {
        return this.convertFromDate(new Date());
    },
    getWeek: function (ztime) {
        if (ztime instanceof Date) {
            return ztime.getDay() || 7;
        } else {
            return this.convertToDate(ztime).getDay();
        }
    },
    getTime: function () {
        var result = zzz.time.now();
        return [result.second, result.minute, result.hour];
    },
    getDate: function () {
        var result = zzz.time.now();
        return [result.day, result.month, result.year];
    },
    test: function (func, loop) {
        if (!loop) loop = 1;
        var name = func.name ? ("anonymous function" + zzz.random.string(5)) : func.name;
        console.log(name + " count start" + (loop > 1 ? " for " + loop + " times" : ""));
        console.time(name);
        for (var i = 0; i < loop; i++) func();
        console.timeEnd(name);
    },
    stringify: function (ztime) {
        var result = "",
            cn = "chinesenumber";
        result += ztime.year ? (zzz.string.stringify(ztime.year, "chinese") + "年") : "";
        result += ztime.month ? (zzz.string.stringify(ztime.month, cn) + "月") : "";
        result += ztime.day ? (zzz.string.stringify(ztime.day, cn) + "日") : "";
        result += ztime.hour ? (zzz.string.stringify(ztime.hour, cn) + "时") : "";
        result += ztime.minute ? (zzz.string.stringify(ztime.minute, cn) + "分") : "";
        result += ztime.second ? (zzz.string.stringify(ztime.second, cn) + "秒") : "";
        result += ztime.milisecond ? (zzz.string.stringify(ztime.milisecond, cn) + "毫秒") : "";
        if (!result) result = "零秒";
        return result;
    },
    diff: function (ztime1, ztime2) {
        var t1 = zzz.time.convertToDate(ztime1).getTime(),
            t2 = zzz.time.convertToDate(ztime2).getTime();
        var difftime = t2 - t1;
        var isNegative = difftime < 0;
        var result = zzz.time.convertFromDate(new Date(zzz.abs(difftime)));
        result.negative = isNegative;
        result.year -= 1970;
        if (result.year < 0) {
            //TODO : negative years are meant to be corrected.
        }
        result.month--;
        result.day--;
        result.hour -= 8;
        result.minute--;
        result.second--;
        return result;
    },
    approximate: function (different) {
        if (!(different instanceof ztimeStructure)) return;
        console.log(different);
        var result = "";
        var cn = "chineseoral";
        var isNegative = different.negative;
        var mostDifferent = 5;
        var sequence = ["year", "month", "day", "hour", "minute", "second"];
        var name = ["年", "个月", "天", "小时", "分钟", "秒"];
        for (let i = 0; i < 6; i++) {
            if (different[sequence[i]] > 0) {
                mostDifferent = i;
                break;
            }
        }
        console.log(different, mostDifferent);
        return zzz.string.stringify(different[sequence[mostDifferent]], cn) + name[mostDifferent] + (isNegative ? "前" : "后");
    },
    create: function (year, month, day, hour, minute, second, milisecond) {
        return new ztimeStructure({
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second,
            milisecond: milisecond
        })
    },
    UTC: function (ztime) {
        if (!ztime) ztime = new Date();
        else if (ztime instanceof ztimeStructure) ztime = zzz.time.convertToDate(ztime);
        else if (!(ztime instanceof Date)) return;
        return ztime.toUTCString();
    },
    ms: function (ztime) {
        if (ztime instanceof ztimeStructure) {
            return ztime.milisecond +
                ztime.second * 1000 +
                ztime.minute * 1000 * 60 +
                ztime.hour * 1000 * 60 * 60 +
                ztime.day * 1000 * 60 * 60 * 24 +
                ztime.month * 1000 * 60 * 60 * 24 * 30 +
                ztime.year * 1000 * 60 * 60 * 24 * 30 * 365;
        } else return 0;
    },
    data: {},
    loop: function (func, time, isClear, name) {
        let number = -1;
        let funcID = zzz.code.sha256.encode(func.toString());
        if (isClear) {
            number = zzz.time.data[funcID];
            if (number === undefined) throw new Error("clearInterval unrecorded function");
            number = number[time];
            if (number === undefined) throw new Error("clearInterval unrecorded function time");
            clearInterval(number);
        } else {
            number = setInterval(func, time);
            if (!zzz.time.data[funcID]) zzz.time.data[funcID] = {};
            zzz.time.data[funcID][time] = number;
        }
        if (name) zzz.time.data[name] = [number, true];
        return number;
    },
    tick: function (func, time, isClear, name) {
        let number;
        let funcID = zzz.code.sha256.encode(func.toString());
        if (isClear) {
            number = zzz.time.data[funcID];
            if (number === undefined) throw new Error("clearTimeout unrecorded function");
            number = number[time];
            if (number === undefined) throw new Error("clearTimeout unrecorded function time");
            clearTimeout(number);
        } else {
            number = setTimeout(func, time);
            if (!zzz.time.data[funcID]) zzz.time.data[funcID] = {};
            zzz.time.data[funcID][time] = number;
        }
        if (name) zzz.time.data[name] = [number, false];
        return number;
    },
    clear: function (numberOrName) {
        var number = (typeof numberOrName === "string") ? zzz.time.data[numberOrName] : numberOrName;
        if (zzz.equal.type(number, "integer")) throw new Error("zzz.time.clear receives param not of number or string");
        isLoop = zzz.time.data[numberOrName][1];
        if (isLoop) clearInterval(number);
        else clearTimeout(number);
    },
    sleep: function (time) {
        return new Promise(function (resolve, reject) {
            setTimeout(resolve, time);
        })
    }
};
//storage
//TODO : cookie and sessionStorage
zzz.storage = {
    init: function () {
        if (window.localStorage) {
            this.db = window.localStorage;
            this.get = function (key) {
                return window.localStorage.getItem(key) || null;
            };
            this.set = function (key, value) {
                return window.localStorage.setItem(key, value);
            };
            this.del = function (key) {
                return window.localStorage.removeItem(key);
            }
        } else if (document.cookie) {
            this.db = document.cookie;
            this.get = function (key) {
                var cookie = document.cookie.split(";");
                var index;
                for (var i of cookie) {
                    index = i.indexOf("=");
                    if (i.slice(0, index) === key) return i.slice(index + 1);
                }
                return null;
            };
            this.readCookie();
        }
    },
    add: function (item, key, value) {
        var obj = zzz.storage.get(item);
        if (obj) obj = JSON.parse(obj);
        else obj = {};
        obj[key] = value;
        var result = JSON.stringify(obj);
        zzz.storage.set(item, result);
    },
    json: function (key, value) {
        if (value) {
            return this.set(key, JSON.stringify(value));
        } else return JSON.parse(zzz.storage.get(key));
    },
    readCookie: function () {
        var cookie = document.cookie.split(";");
        var result = zzz.storage.cookie;
        var index = 0;
        for (var i of cookie) {
            index = i.indexOf("=");
            result[i.slice(0, index)] = i.slice(index + 1);
        }
        return zzz.storage.cookie;
    },
    getc: function (key) {
        zzz.storage.readCookie();
        var result = zzz.storage.cookie[key];
        if (result) return result;
        else return null;
    },
    setc: function (key, value, expire) {
        zzz.storage.cookie[key] = value;
        zzz.storage.expire[key] = expire || zzz.storage.setDiffTime();
        zzz.storage.refreshCookie();
    },
    delc: function (key) {
        document.cookie = key + "=" + zzz.storage.cookie[key] + ";expires=" + (new Date()).toGMTString() + ";";
        delete zzz.storage.cookie[key];
    },
    setDiffTime: function (diffztime) {
        if (diffztime === undefined || diffztime === null) diffztime = zzz.value.storage.defaultExpire * 1000;
        else {
            if (diffztime instanceof Date) diffztime = diffztime.getTime();
            else if (diffztime instanceof ztimeStructure) diffztime = zzz.time.ms(diffztime);
            else if (typeof diffztime === "string") diffztime = zzz.toNum(diffztime);
        }
        var currentTime = new Date();
        currentTime.setTime(currentTime.getTime() + diffztime);
        return currentTime.toGMTString();
    },
    setTime: function (time) {
        if (time instanceof ztimeStructure) time = zzz.time.convertToDate(time);
        return time.toGMTString();
    },
    refreshCookie: function () {
        var cookieText = "";
        for (let i in zzz.storage.cookie) {
            cookieText = i + "=" + zzz.storage.cookie[i] + ";";
            if (zzz.storage.expire[i]) cookieText += "expires=" + zzz.storage.expire[i] + ";";
            document.cookie = cookieText;
        }
    },
    c: function () {
        if (arguments.length === 0) return zzz.storage.readCookie();
        else if (arguments.length === 1) return zzz.storage.getc(arguments[0]);
        else if (arguments.length === 2) {
            if (zzz.equal.type(arguments[1], "object")) {
                for (let i in arguments[1]) {
                    zzz.storage.cookie[i] = arguments[1][i];
                }
                zzz.storage.refreshCookie();
            } else {
                zzz.storage.setc(arguments[0], arguments[1]);
            }
        } else if (arguments.length === 3) zzz.storage.setc(arguments[0], arguments[1], arguments[2])
    },
    cookie: {},
    expire: {}
};
//browser check
//TODO : complementary.
zzz.browser = {
    cookie: window.navigator.cookieEnabled,
    online: window.navigator.onLine,
    uri: window.location.href,
    host: window.location.hostname,
    path: window.location.pathname,
    protocol: window.location.protocol,
    ie: !!window.attachEvent,
    title: document.title,
    back: history.back,
    forward: history.forward,
    replace: location.replace,
    open: function (path, name, type) {
        console.log(path, name || "", type || "");
        window.open(path, name, type);
    },
    init: function () {
        for (var i in zzz.browser.collect) {
            try {
                zzz.browser.collect[i]();
            } catch (e) {}
        }
    }
};
zzz.browser.open.inner = function (settings) {
    if (settings === undefined) return;
    let src;
    if (zzz.equal.type(settings, "string")) {
        src = settings;
    } else {
        src = settings.src;
        delete settings.src;
    }
    if (!src) return;
    var node = zzz.create("iframe");
    var default_settings = {
        frameborder: 0,
        name: undefined,
        height: undefined,
        scrolling: false,
        width: undefined,
        transparent: false
    };
    //transparent
    if (settings.transparent) {
        zzz.set(node, "allowtransparency", "true");
        zzz.set.style("backgroundColor", "transparent");
    }
    node.src = src;
    zzz.addAttr(node, settings);
    return node;
};
//clipboard
//TODO : work with Firefox.
//TODO : handle for object event.
//TODO : add support for paste event(direct read clipborad is forbidden due to security policy, however, a fix for event may girdle around whenever the user dispatches an event such as mousemove, touch,etc.)
zzz.cpy = function (obj) {
        var s = zzz.clip.copy;
        if (zzz.equal.type(text, "string")) {
            return s.text(obj);
        } else if (zzz.equal.type(node, "element")) {
            return s.node(obj);
        }
    },
    zzz.clip = {
        copy: {
            text: function (text) {
                if (window.clipboardData) {
                    window.clipboardData.clearData();
                    window.clipboardData.setData("Text", text);
                    return true;
                } else if (document.execCommand) {
                    var cb = zzz.create("textarea");
                    document.body.appendChild(cb);
                    cb.innerText = text;
                    cb.select();
                    document.execCommand("copy");
                    document.body.removeChild(cb);
                    cb = null;
                    return true;
                }
            },
            node: function (node) {
                if (window.clipboardData) {
                    window.clipboardData.clearData();
                    window.clipboardData.setData("Text", text);
                    return true;
                } else if (document.execCommand) {
                    var mirror = node.cloneNode(true);
                    document.body.appendChild(mirror);
                    var range, selection;
                    if (document.createRange) {
                        range = document.createRange(); //创建一个选中区域
                        range.selectNodeContents(mirror); //选中节点的内容
                        if (mirror.innerHTML.length > 0) {
                            range.setStartBefore(mirror.firstChild); //设置光标起始为指定位置
                        }
                        range.setEndAfter(mirror.lastChild);
                        selection = window.getSelection(); //获取当前选中区域
                        selection.removeAllRanges(); //移出所有的选中范围
                        selection.addRange(range); //添加新建的范围
                    } else if (document.selection) //IE 8 and lower
                    {
                        range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
                        range.moveToElementText(mirror); //Select the entire contents of the element with the range
                        range.select(); //Select the range (make it the visible selection
                    }
                    document.execCommand("copy");
                    document.body.removeChild(mirror);
                    mirror = null;
                    return true;
                }
            }
        },
        update: function () {
            let selection = window.getSelection ? window.getSelection() : {
                anchorOffset: 0,
                focusOffset: 0,
                toString: function () {
                    return "";
                }
            };
            let s = zzz.clip;
            s.text = selection.toString();
            s.start = selection.anchorOffset;
            s.end = selection.focusOffset;
            if (s.start === 0 && s.end === 0) {
                //fix for occasions that don't work
                let element = selection.anchorNode || document.activeElement;
                s.start = element.selectionStart;
                s.end = element.selectionEnd;
            }
            return zzz.clip;
        },
        focus: function (element, position) {
            var range, selection;
            if (!position) position = element.innerText.length;
            //Firefox, Chrome, Opera, Safari, IE 9+
            if (document.createRange) {
                range = document.createRange(); //创建一个选中区域
                range.selectNodeContents(element); //选中节点的内容
                if (element.innerHTML.length > 0) {
                    range.setStart(element.childNodes[0], position); //设置光标起始为指定位置
                }
                range.collapse(true); //设置选中区域为一个点
                selection = window.getSelection(); //获取当前选中区域
                selection.removeAllRanges(); //移出所有的选中范围
                selection.addRange(range); //添加新建的范围
            } else if (document.selection) //IE 8 and lower
            {
                range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
                range.moveToElementText(element); //Select the entire contents of the element with the range
                range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
                range.select(); //Select the range (make it the visible selection
            }
        },
        text: "",
        start: 0,
        end: 0
    };
//attribute
//set type
zzz.addAttr = function (obj, key_value_set) {
    for (let i in key_value_set) {
        obj[i] = key_value_set[i];
    }
};
//chain type
zzz.appendAttr = function (obj, key, value) {
    obj[key] = value;
    var returnObject = {
        func: function (key, value) {
            this.obj[key] = value;
        },
        obj: obj
    };
    return returnObject;
};
//add favorite
//TODO : doesn't work at all!!!
//<a href="#" rel="sidebar" onclick="addFavorite()"></a>
//doesn't work at times.
zzz.addFavorite = function (url, title) {
    var favoriteURL = url || zzz.browser.url,
        favoriteTitle = title || zzz.browser.title;
    if (window.external) {
        //IE 8
        if (window.external.addToFavoritesBar) {
            window.external.AddToFavoritesBar(favoriteURL, favoriteTitle, "");
            return;
        }
        //IE 9
        else if (window.external.addFavorites) {
            window.external.addFavorites(favoriteURL, favoriteTitle);
            return;
        }
    }
    if (window.sidebar && window.sidebar.addPanel) {
        window.sidebar.addPanel(favoriteTitle, favoriteURL, "");
    } else {
        //unable to add automatically
        alert("Please use ctrl+D.");
    }
};
//collect information about the browser
zzz.browser.collect = {
    screen: function () {
        var a = document && document.documentElement && document.documentElement.clientHeight || 0,
            b = window.innerHeight || 0,
            c = document && document.body && document.body.clientHeight || 0;
        zzz.browser.screenY = Math.max(a, b, c);
        a = document && document.documentElement && document.documentElement.clientWidth;
        b = window.innerWidth;
        c = document && document.body && document.body.clientWidth;
        zzz.browser.screenX = Math.max(a, b, c);
    },
    time: function () {
        zzz.browser.time = zzz.time.now();
    },
    fullscreen: function () {
        zzz.browser.hasFullscreen = document.fullscreenEnabled;
    },
    resizeObserver: function () {
        zzz.browser.hasResizeObserver = !!window.ResizeObserver;
    },
    notification: function () {
        zzz.browser.hasNotification = !!window.Notification;
        zzz.browser.canNotify = window.Notification && window.Notification.permission !== "denied";
    }
};
//BOM
//TODO : specify
zzz.get = function (name, parent) {
    if (name[0] === '.') return zzz.get.cls(name.substr(1), parent);
    else if (name[0] === '#') return zzz.get.id(name.substr(1), parent);
    else return zzz.get.tag(name, parent);
};
zzz.query = function (name, parent, func) {
    let result = (parent || document).querySelectorAll(name);
    if (typeof func === "function") {
        for (let i in result) func(result[i], i);
    }
    return result;
};
zzz.queryAttr = function (name, parent, func) {
    let result = [];
    let elements = (parent || document).querySelectorAll(name);
    if (typeof func === "function") {
        for (let i in elements) {
            let res = func(elements[i], i);
            if(res!==undefined) result.push(res);
        }
    }
    return result;
};
//mode:function,key-value.
//it can also be used as mapping
zzz.filter = function (arr, criteria, value) {
    let type = typeof criteria;
    let result = [];
    //mode:function
    if (type === "function") {
        for (i of arr) {
            if (criteria(i)) {
                result.push(i);
            }
        }
    }
    //mode:key-value
    else if (criteria !== undefined && value) {
        for (i of arr) {
            if (i[criteria] === value) {
                result.push(i);
            }
        }
    }
    return result;
};
zzz.map = zzz.filter;
zzz.get.id = function (id, parent) {
    return (parent || document).getElementById(id);
};
zzz.get.cls = function (className, parent) {
    return (parent || document).getElementsByClassName(className);
};
zzz.get.tag = function (tagName, parent) {
    return (parent || document).getElementsByTagName(tagName);
};
zzz.get.attr = function (element, attribute) {
    return element.getAttribute(attribute);
};
zzz.get.style = function (element, style) {
    return getComputedStyle(element)[style];
};
zzz.create = function (tag, attributes, styles, parent) {
    var element = document.createElement(tag);
    if (attributes) {
        for (var i of ["innerText", "className", "innerHTML", "id", "name"]) {
            if (attributes[i]) element[i] = attributes[i];
            //delete attributes[i];
        }
        for (var i in attributes) element.setAttribute(i, attributes[i]);
    }
    if (styles) {
        zzz.anim.set(element, styles);
    }
    if (parent) parent.appendChild(element);
    return element;
};
zzz.set = function (element, attribute, value) {
    element.setAttribute(attribute, value);
};
zzz.set.style = function (element, attr, value) {
    element.style[attr] = value;
};
//audio
//TODO : add event support. e.g. when the user manually pause the audio, or change the volume(add smooth change support), or change a disk.
zzz.audio = {
    to: function (time) {
        this.element.currentTime = time;
    },
    by: function (time) {
        this.element.currentTime += time;
    },
    pause: function () {
        this.element.pause();
    },
    play: function () {
        this.element.play();
    },
    volume: function (volume) {
        this.element.volume = volume;
    },
    speed: function (speed) {
        if (speed && speed > 0)
            this.element.playbackRate = speed;
        return this.element.playbackRate;
    },
    create: function (setting) {
        if (!setting.src) setting.src = "";
        var attributes = {
            muted: setting.muted || "false",
            autoplay: setting.autoplay || "false",
            preload: setting.preload ? "preload" : "metadata",
            controls: setting.controls || "false",
            volume: setting.volume || 1
        };
        var newAudio = zzz.create("audio", attributes);
        if (setting.src) zzz.set(newAudio, setting.src);
        let result = {
            element: newAudio
        };
        if (setting.parent) setting.parent.appendChild(newAudio);
        zzz.addAttr(result, zzz.audio);
        return result;
    },
    playBackground: function (src) {
        if (!src) return;
        var newAudio = zzz.audio.create({
            src: src,
            autoplay: true
        });
        zzz.set.style(newAudio.element, "visibility", "hidden");
        return newAudio;
    }
};

//TODO: add danmaku support, add event support
zzz.video = {
    create: function (settings) {
        var set = {
            autoplay: settings.autoplay ? "true" : "false",
            controls: settings.controls === false ? "false" : "true",
            crossorigin: "true",
            muted: settings.muted ? "true" : "false",
            loop: settings.loop ? "true" : "false",
            preload: settings.preload ? "true" : "false"
        };
        var node = zzz.create("video", set);
        var result = {
            element: node
        };
        zzz.addAttr(result, zzz.video);
        return result;
    }
}

//incidence
//alias:event
zzz.incidence = {
    index: 0,
    init: function () {
        //addEvent
        if (document.body.addEventListener) {
            zzz.incidence.specificEventBinder = 0;
        } else if (document.body.attachEvent) {
            zzz.incidence.specificEventBinder = 1;
        } else zzz.incidence.specificEventBinder = 2;
        //start mousemove
        zzz.incidence.bind(document.body, "mousemove", zzz.incidence.mousemove);
    },
    bind: function (element, type, func, isCapture) {
        //fix for Firefox scroll
        if (type === "scroll") {
            if (zzz.browser.type === "firefox") {
                type = "DOMMouseScroll";
            } else {
                type = "mousewheel";
            }
        }
        //resizeObserver API
        if (type === "resize") {
            if (zzz.browser.hasResizeObserver) {
                return zzz.incidence.bindResizeObserver(element, func);
            }
        }
        if (zzz.incidence.specificEventBinder === 0) {
            return element.addEventListener(type, func, isCapture);
        } else if (zzz.incidence.specificEventBinder === 1) {
            return element.attachEvent("on" + type, func);
        } else {
            if (element["on" + type]) {
                var oldFunc = element["on" + type],
                    newFunc = function () {
                        oldFunc();
                        func();
                    };
                element["on" + type] = newFunc;
            } else
                element["on" + type] = func;
        }
    },
    //batch mode
    binds: function (element, setting) {
        for (let i in setting) {
            this.bind(element, i, setting[i]);
        }
    },
    erase: function (element, type, func, isCapture) {
        //TODO : rewrite with .apply
        if (zzz.incidence.specificEventBinder === 0) {
            element.removeEventListener(type, func);
        } else if (zzz.incidence.specificEventBinder === 1) {
            element.removeEventListener(type, func);
        } else {
            console.log("unable to unbind the function.")
        }
    },
    interpret: function (event) {
        var interpretation = {
            mouse: event.button === 2 ? "right" : (event.button === 0 ? "left" : undefined),
            client: [event.clientX, event.clientY],
            screen: [event.screenX, event.screenY],
            page: [event.pageX, event.pageY],
            alt: event.altKey !== undefined ? event.altKey : (event.getModifierState !== undefined ? event.getModifierState("Alt") : false),
            ctrl: event.ctrlKey || false,
            shift: event.shiftKey || false,
            capslock: event.getModifierState !== undefined ? event.getModifierState("Capslock") : false,
            type: event.type,
            target: event.target || event.srcElement,
            key: (event.key ? event.key.toLowerCase() : (zzz.value.convertTokey && zzz.value.convertTokey(event.keyCode))) || undefined,
            code: event.keyCode || event.which || undefined,
            delta: event.detail ? event.detail / 3 : event.wheelDelta / 120 //firefox fix not present
        };
        return interpretation;
    },
    edit: {
        enable: function (element) {
            zzz.set(element, "contenteditable", "true");
        },
        disable: function (element) {
            zzz.set(element, "contenteditable", "false");
        }
    },
    waiting: false,
    interval: 100, //ms
    mousemove: function (e) {
        if (zzz.incidence.waiting) return;
        e = zzz.incidence.interpret(e);
        zzz.incidence.data.target = e.target;
        zzz.incidence.waiting = true;
        setTimeout(function () {
            zzz.incidence.waiting = false;
        }, zzz.incidence.interval);
    },
    data: {}
};
zzz.event = zzz.incidence;

//page visibility API
zzz.updatePageVisibility = function () {
    zzz.browser.visible = !(document.hidden || document.visibilityState === "hidden" || document.msHidden || document.webkitHidden || false);
};

//console API
//TODO
zzz.console = function () {
    return console.log(arguments);
};
//console.clear().count().debug().countReset().error().info().time(name).

//broadcast API
//works only and when the pages are of the same origin, i.e. the protocol, host and port are the same.
//for example, http://host.com/1 can send message to http://host.com/2.html, but not https:// or :5050 or subdomain.host.com
zzz.message = {
    nameStorage: {},
    init: function () {
        if (window.BroadcastChannel) zzz.browser.hasBroadcastAPI = true;
        else zzz.browser.hasBroadcastAPI = true;
    },
    open: function (name) {
        if (!zzz.browser.hasBroadcastAPI) return false;
        if (!name) {
            name = zzz.random.string(5);
            while (zzz.channel.nameStorage[name]) {
                name = zzz.random.string(5);
            }
        }
        var channel = new window.BroadcastChannel(name);
        this.nameStorage[name] = channel;
        return name;
    },
    send(name, arg) {
        if (!zzz.browser.hasBroadcastAPI) return false;
        this.nameStorage[name].postMessage(arg);
        return arg;
    },
    bind: function (name, func) {
        if (!this.nameStorage[name]) return false;
        this.nameStorage[name].onmessage = func;
        return name;
    },
    close: function (name) {
        if (!this.nameStorage[name]) return false;
        this.nameStorage[name].close();
        delete this.nameStorage[name];
        return name;
    }
};
//file API
//blob.size
//blob.type
//blob.close()
//blob.slice
zzz.file = {
    help: "blob(buffer,options),create(arr,MIMEtype,ending?native:intact),.close(),.size,.type,.slice()",
    blob: function (buffer, options) {
        try {
            return new Blob(buffer, options);
        } catch (e) {
            var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
            buffer.forEach(function (buf) {
                bb.append(buf);
            });
            return bb.getBlob(options);
        }
    },
    create: function (arr, type, nativeEnding) {
        var options = {};
        if (!zzz.equal.type(arr, "array")) arr = [arr];
        if (type !== undefined) options.type = type.indexOf("/") === -1 ? zzz.value.file.encode(type) : type;
        if (nativeEnding !== undefined) options.endings = nativeEnding ? "native" : "transparent";
        return new zzz.file.blob(arr, options);
    },
    download: function (url) {
        if (!zzz.equal.type(url, "string")) return false;
        var node = zzz.create("a", {
            href: url,
            download: url
        }, {
            display: "none"
        });
        node.innerText = "1";
        if ("download" in node) {
            document.body.appendChild(node);
            node.click();
        }
    },
    getUrl: function (blob) {
        try {
            return URL.createObjectURL(blob);
        } catch (e) {
            return "";
        }
    },
    delUrl: function (url) {
        try {
            return URL.revokeObjectURL(url);
        } catch (e) {

        }
    },
    useURL: function (blob, func) {
        var url = zzz.file.getUrl(blob);
        func(url);
        zzz.file.delUrl(url);
    },
    imageToBlob: function (src, callback) {
        if (!callback) return;
        if (zzz.paint.canvasEnabled) {
            var canvas = zzz.create("canvas");
            /*
            var type=src;
            if(type.lastIndexOf(".")!==-1) type=type.substr(type.lastIndexOf(".")+1);
            else if(type.substr(0,4)==="data") type=type.slice(11,type.search("base64"));
            else type="jpeg";
            */
            var element = zzz.create("img", {
                crossOrigin: "anonymous",
                src: src
            }, {
                display: "none"
            }, document.body);
            /*var element=new Image();
            element.crossOrigin="anonymous";
            element.src=src;

             */
            element.onload = function () {
                canvas.width = element.width;
                canvas.height = element.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(element, 0, 0, element.width, element.height);
                canvas.toBlob(callback);
            }
        } else throw new Error("zzz.file.imageToBlob failed.");
    }
};

//fetch API
//simple fetch=get
//simple use:zzz.get.url(url,settings{type[form,html,js,css,text,json,etc],method[get,post,option],callback:function(){},success:f(){},fail(){}})
zzz.fetch = {
    fetchEnabled: false,
    ajaxEnabled: false,
    headers: {
        form: {
            'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8"
        },
        forbidden: ['Accept-Charset', 'Accept-Encoding', 'Access-Control-Request-Headers', 'Access-Control-Request-Method', 'Connection', 'Content-Length', 'Cookie', 'Cookie2', 'Date', 'DNT', 'Expect', 'Host', 'Keep-Alive', 'Origin', 'Referer', 'TE', 'Trailer', 'Transfer-Encoding', 'Upgrade', 'Via']
    },
    safe_fetch: {
        method: "GET",
        mode: "same-origin",
        credentials: "same-origin",
        cache: "default",
        redirect: "follow"
    },
    requestStructure: function () {
        return {
            url: undefined,
            data: undefined,
            method: undefined,
            cors: false,
            cache: undefined,
            header: undefined,
            credentials: undefined,
            redirect: undefined,
            referrer: undefined,
            integrity: undefined,
            referrerPolicy: undefined,
            callback: undefined,
            async: true
        };
    },
    headStructure: {
        Date: "", //standard format:Web, 21 Oct 2015 07:28:00 GMT
        Cookie: "", //cookie
    },
    head: {
        create: function (settings) {
            var head = new Headers();
            for (var i in settings) {
                i = i[0].toUpperCase() + i.substr(1);
                head.append(i, settings.i);
            }
            return head;
        }
    },
    send: function () {
        throw new Error("sending fetch");
    },
    create: function (url, settings) {
        var request = zzz.fetch.requestStructure();
        request.url = url;
        zzz.addAttr(request, settings);
        var promise = zzz.fetch.fetchEnabled ? zzz.fetch.fetch(request) : zzz.fetch.ajax(request);
        return promise;
    },
    init: function () {
        try {
            if (window.fetch || WorkerGlobalScope.fetch) zzz.fetch.fetchEnabled = true;
        } catch (e) {}
        try {
            if (new XMLHttpRequest()) zzz.fetch.ajaxEnabled = true;
        } catch (e) {}
        if (zzz.fetch.fetchEnabled) {
            zzz.fetch.fetch = function (settings) {
                if (!settings.url) return false;
                if (zzz.equal.type(settings.input, "string")) {}
                var init = {
                    method: settings.method || (settings.data ? "POST" : "GET"),
                    mode: settings.cors ? "cors" : "same-origin",
                    body: settings.data || undefined,
                    credentials: settings.credentials || "include",
                    cache: settings.cache || "reload",
                    redirect: settings.redirect || undefined,
                    referrer: settings.referrer || undefined,
                    integrity: settings.integrity || undefined,
                    referrerPolicy: settings.referrerPolicy || undefined
                };
                //callback is json/text/blob which can apply the respective function .x()
                var promise = zzz.fetch.send(settings.url, init);
                if (settings.callback) return promise.then(settings.callback);
                else return promise;
            };
        }
        if (zzz.fetch.ajaxEnabled) {
            zzz.fetch.ajax = function (settings) {
                if (!settings.url) return false;
                var xhr = new XMLHttpRequest();
                //document
                /*
                onreadystatechange
                ontimeout
                readyState:enumerate{unsent,opened,headers_received,loading,done},therefore 4 means ready.
                response[Array,Blob,Document,DOMString]
                responseType
                responseText:null
                responseURL:""
                status:401...
                statusText:"200 OK"...
                timeout:ms
                withCredentials:?
                upload:the object
                --non-standard
                --onload
                --onloadstart
                --onloadend
                --onerror
                --onabort
                --onprogress
                abort():stop
                open("GET"method,url,async=true,username=null,password=null):initialize
                setRequestHeader(header,value):add value instead of overriding the previous one if permitted
                overrideMimeType(type):override response header
                getAllResponseHeaders:"...CRLF...",null
                getResponseHeader(header):null

                */
                xhr.open(settings.method || "GET", settings.url, settings.async === undefined ? true : settings.async);
                if (settings.callback) xhr.onreadystatechange = settings.callback;
                if (settings.timeout) xhr.timeout = settings.timeout;
                if (settings.form)
                    for (let i in this.headers.form) xhr.setRequestHeader(i, this.headers.form[i]);
                if (settings.header)
                    for (let i in settings.header) xhr.setRequestHeader(i, settings.header[i]);
                if (settings.ontimeout) xhr.ontimeout = settings.ontimeout;
                xhr.send(settings.data);
                return xhr;
            }
        }
    },
    judge: function (response) {
        console.log(response);
        if (response.complete) return "success";
        if (response.ok !== undefined) return response.ok ? "success" : "fail";
        return response.readyState === 4 ? (response.status === 200 ? "pending" : "fail") : "success";
    },
    //jsonp without cors callback
    cors: function (src, type, parent, callback) {
        if (!parent) parent = document.body;
        if (!type) type = "script";
        var node = zzz.create(type, {
            src: src
        }, {
            display: "none"
        });
        if (callback) {
            let wrapper = function () {
                callback({
                    node: node,
                    ok: true
                });
            };
            let wrapper_fail = function () {
                callback({
                    node: node,
                    ok: false
                });
            };
            let wrapper_change = function () {
                callback({
                    node: node,
                    readyState: node.readyState
                });
            };
            zzz.incidence.bind(node, "load", wrapper);
            zzz.incidence.bind(node, "readystatechange", wrapper_change);
            zzz.incidence.bind(node, "error", wrapper_fail);
        }
        parent.appendChild(node);
        return node;
    },
    //jsonp with cors callback
    get: function (src, callback, parent, head) {
        if (!parent) parent = document.body;
        var node = zzz.create("script", {
            src: src
        }, {
            display: "none"
        });
        var uniqueText = zzz.random.string(30);
        window[uniqueText] = function (response) {
            callback(response);
            delete window[uniqueText];
        };
        zzz.set(node, "src", zzz.path.merge(src, {
            callback: uniqueText
        }));
        parent.appendChild(node);
        return node;
    },
    //resource loading
    css: function (src, parent) {
        var node = zzz.create("link", {
            href: src,
            rel: "stylesheet",
            type: "text/css"
        });
        if (!parent) parent = document.body;
        parent.appendChild(node);
        return node;
    },
    font: function (name, src) {
        var node = zzz.create("style");
        node.innerText = "@font-face{font-family:'" + name + "';src:url('" + src + "')}";
        document.body.appendChild(node);
    },
    js: function (src, parent) {
        if (!parent) parent = document.body;
        var node = zzz.create("script", {
            src: src
        });
        parent.appendChild(node);
    }
};
//canvas
zzz.paint = {
    canvasEnabled: false,
    init: function () {
        var node = zzz.create("canvas");
        if (node.getContext) this.canvasEnabled = true;
    },
    get: function (element) {
        return element.getContext("2d");
    },
    create: function (parent) {
        if (!parent) parent = document.body;
        var canvas = zzz.create("canvas");
        parent.appendChild(canvas);
        return canvas.getContext("2d");
    },
    alias: {
        width: "lineWidth",
        lcolor: "strokeStyle",
        fcolor: "fillStyle",
        align: "textAlign",
        shadowx: "shadowOffsetX",
        shadowy: "shadowOffsetY",
        shadowcolor: "shadowColor",
        shadowblur: "shadowBlur"
    },
    paintMethod: {
        information: {
            width: 1,
            x: 0,
            y: 0,
            align: "center",
            font: "30px"
        },
        beginPath: function (canvas) {
            canvas.beginPath();
        },
        to: function (canvas, x, y) {
            canvas.moveTo(x, y);
        },
        line: function (canvas, x, y) {
            canvas.lineTo(x, y);
        },
        paint: function (canvas) {
            canvas.stroke();
        },
        closePath: function (canvas) {
            canvas.closePath();
        },
        rect: function (canvas, x, y, w, h, isHollow) {
            if (isHollow) canvas.strokeRect(x, y, w, h);
            else canvas.fillRect(x, y, w, h);
        },
        clear: function (canvas, x, y, w, h) {
            canvas.clearRect(x, y, w, h);
        },
        image: function (canvas, src) {
            var img = new Image();
            img.src = src;
            var wrapper = function () {
                canvas.drawImage(img, this.information.x, this.information.y);
            };
            img.onload = wrapper;
        },
        read: function (canvas, x, y, w, h) {

        },
        //no line-break usable.manual.
        text: function (canvas, text, isHollow) {
            if (isHollow) canvas.strokeText(text, this.information.x, this.information.y);
            else canvas.fillText(text, this.information.x, this.information.y);
        },
        set: function (canvas, key, value) {
            this.information[key] = value;
            canvas[zzz.paint.alias[key]] = value;
        },
        fill: function (color) {
            if (!color) color = this.color;
        }
    }
};

//fullscreen API
//alternative:esc or F11
zzz.browser.fullscreen = {
    status: false,
    enter: function (element) {
        if (!element) return;
        this.status = true;
        return element.requestFullscreen();
    },
    exit: function () {
        this.status = false;
        return document.exitFullscreen();
    }
};

//drag API
//caution: draggable can only be set "true" or "false" instead of true or false.
zzz.incidence.drag = {
    enable: function (element) {
        element.draggable = "true";
    },
    disable: function (element) {
        element.draggable = "false";
    },

};

//resizeObserver API
zzz.incidence.bindResizeObserver = function (element, func) {
    var f = new window.ResizeObserver(func);
    f.observe(element);
    return f;
};

//absolute path API
//convert a relative path into an absolute API
//for example, ../images/1.jpg + https://blog.cn/css = https://blog.cn/images/1.jpg
//do not add / to the end.
zzz.path = {
    split: function (url) {
        //https://www.a.b.com:443/d?e=f&g=h
        //protocol=https:
        //path=/d
        //domain=com
        //subdomain=www.a
        //host=www.a.b.com
        //port=443
        //judge protocol from ://,and delete it.
        var protocol_index, protocol, component_index, component = [],
            port_index, port, host, path = "/",
            host_index, domain, subdomain;
        protocol_index = url.match("://");
        protocol = protocol_index ? url.substr(0, protocol_index.index + 1) : "";
        if (protocol_index) url = url.substr(protocol_index.index + 3);
        if (url[0] === "/") url = url.substr(1);
        //judge component from ?,and delete it.
        component_index = url.match(/\?/);
        if (component_index) {
            component = url.substr(component_index.index + 1).split("&");
            url = url.slice(0, component_index.index);
        }
        //judge port from :xxx, and delete it.
        port_index = url.match(/:[0-9]{1,5}/);
        if (port_index) {
            port = port_index[0].substr(1);
            host = url.slice(0, port_index.index);
            path = url.slice(port_index.index + port.length + 1) || "/";
        } else {
            port = "";
            host_index = url.indexOf("/");
            if (host_index !== -1) {
                host = url.slice(0, host_index);
                path = url.slice(host_index);
            } else host = url;
        }
        var domains = host.split(".");
        domain = domains ? domains[domains.length - 1] : "";
        if (!zzz.equal.type(zzz.toNum(domain), "NaN")) domain = host;
        subdomain = host.replace(domain, "");
        if (subdomain[subdomain.length - 1] === ".") subdomain = subdomain.substr(0, subdomain.length - 1);
        var result = {
            protocol: protocol,
            0: protocol,
            path: zzz.code.path.decode(path),
            host: host,
            1: host,
            domain: domain,
            subdomain: subdomain,
            port: port,
            2: port,
            component: {},
            3: {}
        };
        if (result.protocol === "file:") {
            result.domain = "";
            result.subdomain = "";
            result[1] = result[2] = "";
        }
        for (let i of component) {
            if (!i) continue;
            let len = i.length;
            for (var key = 0; i[key] !== "=" && key < i.length; key++) {}
            let name = zzz.code.path.decode(i.substr(0, key));
            let value = zzz.code.path.decode(i.substr(key + 1));
            result.component[name] = value;
            result[3][name] = value;
        }
        return result;
    },
    merge: function () {
        var result = "";
        if (arguments.length === 1) {
            var short = arguments[0];
            result += short.protocol ? (short.protocol + "//") : "";
            if (short.protocol === "file:") result += "/";
            result += short.host || "";
            result += short.port ? (":" + short.port) : "";
            if (short.path) result += short.path;
            if ((!short.port) && (!short.path) && result[result.length - 1] !== "/") result += "/";
            result = zzz.code.url.encode(result);
            if (short.component) {
                result += "?";
                let items = [];
                for (var i in short.component) {
                    if (!i) continue;
                    items.push(zzz.code.path.encode(i) + "=" + zzz.code.path.encode(short.component[i]));
                }
                result += items.join("&");
            }
            if (result[result.length - 1] === "?") result = result.substr(0, result.length - 1);
            return result;
        } else if (arguments.length === 2 && zzz.equal.type(arguments[0], "string") && zzz.equal.type(arguments[1], "object")) {
            let origin = zzz.path.split(arguments[0]);
            for (var i in arguments[1]) {
                origin.component[i] = arguments[1][i];
            }
            return zzz.path.merge(origin);
        } else console.log("invalid input for zzz.path.merge, the arguments are", arguments);
    },
    deleteEnd: function (url) {
        return url.replace(/\/$/, "");
    },
    abs: function (url, base) {
        if (!base) base = "";
        var node = zzz.create("a");
        zzz.set(node, "href", base + url);
        var result = node.href;
        node = null;
        return zzz.path.deleteEnd(result);
    }
};

zzz.anim = {
    translate: {
        read: function (text) {
            //only for 2.33px,46% and such
            text = text.replace(/\s/g, "");
            var i = text.match(/[0-9]/),
                j;
            if (!i) {
                //pure string
                return text;
            } else {
                i = text.match(/[^0-9\.]/);
                j = i ? i.index : text.length;
                return {
                    value: zzz.toNum(text.slice(0, j)),
                    unit: text.slice(j, text.length)
                };
            }
        },
        readColor: function (text) {
            text = text.replace(/\s/g, "");
            if (text[0] === "#") {
                if (text.length === 7) {
                    return {
                        r: (zzz.value.hex(text[1]) << 4) + zzz.value.hex(text[2]),
                        g: (zzz.value.hex(text[3]) << 4) + zzz.value.hex(text[4]),
                        b: (zzz.value.hex(text[5]) << 4) + zzz.value.hex(text[6]),
                    };
                } else {
                    throw new Error("unfinished function in readColor");
                }
            } else {
                var splitText = text.split(","),
                    result = {},
                    name = ["r", "g", "b", "a"];
                splitText.forEach(function (value, index, array) {
                    result[name[index]] = zzz.toNum(value);
                });
                return result;
            }
        },
        //TODO: there are bugs within
        split: function (style, styleString) {
            /*example:
            "2en","rotate(4rad) translateX(3px)","SimSun,'Times New Roman'"
            */
            if (style.indexOf("-") !== -1) style = zzz.string.camel(style);
            var splitString = [],
                result = {},
                i, j, k, l, index = 0;
            if (style === "fontFamily") {
                splitString = styleString.split(",");
                for (i in splitString) {
                    //remove ' "
                    if (splitString[i][0] === "'" || splitString[i][0] === '"') {
                        splitString[i] = splitString[i].slice(1, splitString[i].length - 1);
                    }
                }
                return splitString;
            } else if (style === "backgroundImage") {
                i = styleString.indexOf("(");
                j = styleString.lastIndexOf(")");
                //TODO: BASE64
                return styleString.slice(i + 1, j).replace(/['"]/g, "");
            } else if (style.match(/color/i)) {
                l = "color";
                i = styleString;
                j = i.indexOf("(");
                if (j !== -1) k = zzz.anim.translate.readColor(i.slice(j + 1, i.length - 1));
                else k = "";
                result[l] = k;
                return result;
            } else {
                splitString = styleString.split(" ");
                for (i of splitString) {
                    if (!i) continue;
                    j = i.indexOf("(");
                    l = i.slice(0, j);
                    if (j !== -1) {
                        k = zzz.anim.translate.read(i.slice(j + 1, i.length - 1));
                        result[l] = k;
                    } else {
                        k = zzz.anim.translate.read(i);
                        result[index++] = k;
                    }
                }
                return result;
            }
        },
        batch: function (CSSText) {
            var splitText = CSSText.split(/[;\n]/),
                i, j, k, l, result = {};
            for (i of splitText) {
                if (!i) continue;
                j = i.indexOf(":");
                l = i.slice(0, j).replace(/\s/g, "");
                k = zzz.anim.translate.split(l, i.slice(j + 1));
                result[zzz.string.camel(l)] = k;
            }
            return result;
        },
        calculate: function (currentValue, previousValue) {
            if (!previousValue) previousValue = 0;
            if (!currentValue) return previousValue;
            //rule: prev stands for previousValue
            var result = 0,
                calculate = function (prev, string) {
                    return zzz.eval(string.replace(/prev/g, prev));
                };
            if (zzz.equal.type(currentValue[0] - 0, "NaN")) {
                if (currentValue[0] === "p") {
                    return calculate(previousValue, currentValue);
                } else return calculate(previousValue, "prev" + currentValue);
            } else {
                if (currentValue.match("prev")) {
                    //calculate
                    return calculate(previousValue, currentValue);
                } else return currentValue;
            }
        },
        merge: function (currentStyle, previousStyle) {
            if (zzz.equal.type(currentStyle, "string")) return currentStyle;
            if (!previousStyle) previousStyle = {};
            var i, result = [];
            for (i in currentStyle) {
                if (zzz.equal.type(currentStyle[i], "string")) result.push(currentStyle[i]);
                if (i === "color") {
                    var core =
                        zzz.anim.translate.calculate(currentStyle[i].r, previousStyle[i] ? previousStyle[i].r : null) +
                        "," +
                        zzz.anim.translate.calculate(currentStyle[i].g, previousStyle[i] ? previousStyle[i].g : null) +
                        "," +
                        zzz.anim.translate.calculate(currentStyle[i].b, previousStyle[i] ? previousStyle[i].b : null);
                    if (currentStyle[i].a !== undefined || (previousStyle[i] && previousStyle[i].a !== undefined)) result.push("rgba(" + core + "," + zzz.anim.translate.calculate(currentStyle[i].a, previousStyle[i] ? previousStyle[i].a : null) + ")");
                    else result.push("rgb(" + core + ")");
                } else if (!!(i - 0 + 1) && currentStyle[i].value) result.push(zzz.anim.translate.calculate(currentStyle[i].value, (previousStyle[i] ? previousStyle[i].value || null : null)) + (currentStyle[i].unit || (previousStyle[i] && previousStyle[i].unit) || ""));
                else {
                    result.push(i + "(" + (currentStyle[i].value || "") + (currentStyle[i].unit || (previousStyle[i] && previousStyle[i].unit) || "") + ")");
                }
            }
            return result.join(" ");
        },
        wrap: function (text) {
            return {
                0: {
                    value: text
                }
            };
        }
    },
    set: function (element, style) {
        for (let i in style) {
            element.style[i] = style[i];
        }
    },
    act: function (element, currentStyle, previousStyle) {
        if (!previousStyle) previousStyle = {};
        if (!zzz.anim.elements[element]) zzz.anim.elements[element] = {};
        var i, previousValue;
        for (i in currentStyle) {
            if (zzz.equal.type(currentStyle[i], "string")) currentStyle[i] = zzz.anim.translate.wrap(currentStyle[i]);
            previousValue = previousStyle[i];
            if (previousValue === undefined || previousValue === null) previousValue = zzz.anim.elements[element][i];
            if (previousValue === undefined || previousValue === null) previousValue = zzz.anim.translate.split(i, zzz.get.style(element, i));
            currentStyle[i] = zzz.anim.translate.merge(currentStyle[i], previousValue);
            //console.log(currentStyle[i]);
            zzz.anim.elements[element][i] = zzz.anim.translate.split(i, currentStyle[i]);
        }
        zzz.anim.set(element, currentStyle);
    },
    elements: {},
    requests: {}
};
//scroll API
zzz.anim.scroll = {
    to: function (element, x, y, isSmooth) {
        if (!element) element = window;
        if (isSmooth === undefined) isSmooth = true;
        element.scrollTo(x, y, isSmooth);
    },
    by: function (element, x, y, isSmooth) {
        if (!element) element = window;
        if (isSmooth === undefined) isSmooth = true;
        element.scrollBy(x, y, isSmooth);
    },
    into: function (element, isSmooth) {
        if (!element) return;
        if (isSmooth === undefined) isSmooth = true;
        element.scrollIntoView(isSmooth);
    }
};

//editor API
//author ： zzs
zzz.editor = {
    enable: function () {
        var n = zzz.get.id("main").childNodes;
        for (var i in n) {
            if (!(n[i] instanceof HTMLElement)) continue;
            zzz.incidence.drag.enable(n[i]);
            zzz.incidence.edit.enable(n[i]);
            zzz.incidence.bind(n[i], "scroll", function (e) {
                var data = zzz.incidence.interpret(e);
                zzz.appendAttr(data.target.style, "fontSize", zzz.toNum(zzz.get.style(data.target, "fontSize")) + data.delta + "px");
                e.preventDefault();
                return false;
            })
        }

    }
};

//web connection API
zzz.web = {
    status: {
        wifi: false,
        web: false,
        foreign: false,
        local: false,
        temp: false
    },
    init: function () {
        this.test("wifi");
        this.test("web");
        this.test("foreign");
        this.test("local");
    },
    test: function (type, func) {
        if (type === "local") {
            zzz.web.status.local = zzz.browser.protocol === "file:";
        } else if (type === "wifi") {

        } else if (type === "foreign" || type === "web") {
            for (let i of zzz.value[type]) {
                let count = 0;
                zzz.web.test(i, function (result) {
                    if (count === zzz.value[type].length) func(false);
                    if (count === zzz.value[type].length + 1) return;
                    if (result === true) {
                        count = zzz.value[type].length + 1;
                        func(true);
                        return;
                    } else count++;
                });
            }
        } else {
            //common url
            let executed = false;
            zzz.fetch.cors(type, "img", null, function (node) {
                if (!node) return;
                if (executed) return;
                executed = true;
                if (node.complete === true) func(true);
                else func(false);
            });
        }
    }
};

zzz.api = {};
//update API(abandoned)

//string
zzz.string = {
    distance: function (str1, str2) {
        var len1 = str1.length,
            len2 = str2.length,
            maxLength = Math.max(len1, len2);
        var save = new Array(len2 + 1);
        var t1, t2;
        for (var i = 0; i <= len2; i++) save[i] = i;
        for (var i = 1; i <= len1; i++) {
            t1 = save[0]++;
            for (var j = 1; j <= len2; j++) {
                t2 = save[j];
                if (str1[i - 1] === str2[j - 1]) save[j] = t1;
                else save[j] = Math.min(t1, save[j - 1], save[j]) + 1;
                t1 = t2;
            }
        }
        return save[len2];
    },
    first_letter_algorithm: function (str1, str2) {
        //TODO : need further thinking
        var dist = zzz.string.distance(str1, str2);
        return 2*dist- str1.length + str2.length;
    },
    stringify: function (obj, type) {
        if (!zzz.equal.type(type, "string")) return "";
        type = type.toLowerCase();
        if (zzz.equal.type(obj, "number")) {
            if (type === "chinesenumber" || type === "chsnum") {
                return zzz.string.chineseNumber(obj);
            } else if (type === "big" || type === "bigchinese") {
                return zzz.string.chineseNumber(obj, true);
            } else if (type === "chineseoral" || type === "oral") {
                var result = zzz.string.chineseNumber(obj);
                if (result === "二") result = "两";
                return result;
            } else if (type === "chinese" || type === "chs") {
                var result = obj.toString().split("");
                result.forEach(function (value, index, array) {
                    if (value === "-") array[index] = "负";
                    else if (value === ".") array[index] = "点";
                    else array[index] = zzz.value.ChineseNumber[value.charCodeAt(0) - zzz.value.zero];
                });
                return result.join("");
            } else return obj.toString();
        } else {
            if (obj.toString) return obj.toString();
            else if (obj.name) return obj.name;
            else return "";
        }
    },
    chineseNumber: function (number, isBig, characterTable) {
        var charset;
        if (!characterTable) charset = zzz.value[isBig ? "ChineseNumberBig" : "ChineseNumber"];
        else charset = characterTable;
        var text = number.toString(),
            length = text.length,
            i, isNegative = number < 0;
        var result = "";
        var occupied = [];
        var index = 0;
        number = zzz.abs(number);
        var fraction = text.indexOf(".") + 1;
        number = zzz.down(number);
        //亿
        i = zzz.down(number / 100000000);
        occupied[index] = !!i;
        index++;
        if (i) result += zzz.string.chineseNumber(i, isBig) + charset[14];
        //万
        number = number % 100000000;
        i = zzz.down(number / 10000);
        occupied[index] = !!i;
        if (i && (!occupied[index - 1]) && result) result += charset[0];
        index++;
        if (i) result += zzz.string.chineseNumber(i, isBig) + charset[13];
        //千
        number = number % 10000;
        i = zzz.down(number / 1000);
        occupied[index] = !!i;
        if (i && (!occupied[index - 1]) && result) result += charset[0];
        index++;
        if (i) result += charset[i] + charset[12];
        //百
        number = number % 1000;
        i = zzz.down(number / 100);
        occupied[index] = !!i;
        if (i && (!occupied[index - 1]) && result) result += charset[0];
        index++;
        if (i) result += charset[i] + charset[11];
        //十
        //fix:去除“一十”中的“一”字
        number = number % 100;
        i = zzz.down(number / 10);
        occupied[index] = !!i;
        if (i && (!occupied[index - 1]) && result) result += charset[0];
        index++;
        if (i > 1) result += charset[i];
        if (i) result += charset[10];
        //一
        number = number % 10;
        i = number;
        occupied[index] = !!i;
        if (i && (!occupied[index - 1]) && result) result += charset[0];
        index++;
        if (i) result += charset[i];
        //零
        if (result.length === 0) result += charset[0];
        if (fraction) {
            result += charset[15];
            text = text.slice(fraction);
            for (let i in text) result += charset[text.charCodeAt(i) - "0".charCodeAt(0)];
        }
        return (isNegative ? "负" : "") + result;
    },
    //Manacher's Algorithm
    //查找最长回文子串
    manacher: function (str) {
        var emptyString = "";
        var i, j, strLength = str.length << 1;
        var processedString = new Array(strLength);
        var length = new Array(strLength);
        processedString[0] = "NaN";
        length[0] = 1;
        for (j = 0, i = 1; i < strLength; i++) {
            processedString[i] = (i & 1) ? str[j++] : emptyString;
            length[i] = 0;
        }
        var right = 1,
            center = 1,
            radix = 0,
            maxLength = 1;
        i = 1;
        while (i < strLength) {
            if (i <= right) radix = length[(center << 1) - i];
            else radix = 1;
            for (radix += i; radix < strLength; radix++) {
                if (processedString[radix] != processedString[(i << 1) - radix]) break;
            }
            length[i] = radix - i;
            if (radix - 1 > right) {
                right = radix - 1;
                center = i;
            }
            i++;
        }
        j = 0;
        for (i = 2; i < strLength; i++) {
            if (maxLength < length[i]) {
                j = i;
                maxLength = length[i];
            }
        }
        return [j, maxLength];
    },
    camel: function (CSSText) {
        var i = CSSText.indexOf("-"),
            letter = "";
        while (i !== -1) {
            letter = CSSText[i + 1].toUpperCase();
            CSSText = CSSText.slice(0, i) + letter + CSSText.slice(i + 2);
            i = CSSText.indexOf("-");
        }
        return CSSText;
    },
    line: function (JSText) {
        var i = JSText.search(/[A-Z]/),
            length = JSText.length,
            letter = "";
        while (i !== -1) {
            letter = JSText[i].toLowerCase();
            JSText = JSText.slice(0, i) + "-" + letter + JSText.slice(i + 1);
            i = JSText.search(/[A-Z]/)
        }
        return JSText;
    },
    find: function (text, reg, start) {
        if (start) text = text.slice(start);
        var index = text.search(reg);
        if (index !== -1) index += (start || 0);
        return index;
    }
};

//unicode translator
zzz.api.unicode = {
    translate: function (code) {
        return String.fromCharCode(code);
    },
    search: function (name, dict) {
        if (dict[name] !== undefined) return dict[name];
        else {
            var minDistance = 999999,
                temp, minPosition = "";
            for (var i in dict) {
                temp = zzz.string.first_letter_algorithm(name, i);
                if (temp < minDistance) {
                    minDistance = temp;
                    minPosition = i;
                }
            }
            if (minPosition !== "") return dict[minPosition];
            else return null;
        }
    }
};
zzz.structure = {
    stack: function () {
        return {
            array: [],
            index: 0,
            push: function (obj) {
                this.array[this.index] = obj;
                this.index++;
            },
            pop: function () {
                if (this.index > 0) {
                    this.index--;
                    return this.array[this.index + 1];
                } else return null;
            },
            top: function () {
                return this.index ? this.array[this.index - 1] : null;
            }
        };
    },
    queue: function () {
        return {
            array: [],
            index_left: 0,
            index_right: 0,
            push: function (obj) {
                this.array[this.index_right] = obj;
                this.index_right++;
                if (this.index_left > 100) {
                    for (var i = this.index_left; i < this.index_right; i++) {
                        this.array[i - this.index_left] = this.array[i];
                    }
                    this.index_right -= this.index_left;
                    this.index_left = 0;
                }
            },
            pop: function () {
                if (this.index_right > this.index_left) {
                    this.index_left++;
                    return this.array[this.index_left - 1];
                } else return null;
            },
            top: function () {
                return this.index_left < this.index_right ? this.array[this.index_left] : null;
            }
        }
    }
};
//runner API
//format:{
//method:"equal" or "match" or "function"
//string:"..."
//function:"..."
//}
zzz.run = {
    init: function () {
        if (!document.run) document.run = [];
        var urlParts = zzz.path.split(zzz.browser.uri);
        let keyword = urlParts.host + urlParts.path;
        keyword = keyword.replace(/[.\/ ]/g, "");
        //to avoid tampermonkey restrictions
        for (let i of document.run) {
            try {
                if (i.method === "equal") {
                    if (zzz.browser.uri.indexOf(i.string)===-1) continue;
                } else if (i.method === "match") {
                    if (!urlParts.host.match(i.string)) continue;
                } else if (i.method === "function") {
                    if (!(i.function && i.function(urlParts))) continue;
                } else if (i.method === "keyword") {
                    if (keyword.indexOf(i.string) === -1) continue;
                }
                i.run();
            } catch (e) {
                console.log("something in zzz.run.init wrong!");
                console.log(e);
            }

        }
    }
};
//downloader API
zzz.api.download = {
    uniqueName: "download_url_display",
    targetNode: document.head,
    analyze: function (targetNode) {
        console.log(targetNode);
        var result = [];
        //valid type:image,video,audio
        var validType = new Set(["img", "video", "audio"]);
        var tag = targetNode.tagName.toLowerCase();
        console.log(tag);
        if (validType.has(tag)) {
            //download this node
            result.push(targetNode.src);
        } else {
            for (let i of validType.keys()) {
                var node = targetNode.getElementsByTagName(i);
                if (node) {
                    console.log(node);
                    for (let j of node) result.push(j.src);
                }
            }
        }
        return result;
    },
    init: function () {
        var node = zzz.create("div", {
            id: zzz.api.download.uniqueName
        }, {
            zIndex: "99999",
            position: "fixed",
            display: "block",
            top: 0,
            left: 0,
            width: "100%",
            height: "auto",
            opacity: "0.9",
            backgroundColor: "rgba(255,255,255,0.5)",
            fontSize: "1em",
            color: "black",
            maxHeight: "500px",
            overflowX: "hidden",
            overflowY: "auto"
        }, document.body);
        zzz.create("style", {
            innerText: "#" + zzz.api.download.uniqueName + " p{" +
                "line-break:anywhere;" +
                "max-height:1em;" +
                "line-height:1em;" +
                "}"
        }, null, document.body);
        /*zzz.incidence.bind(document.body,"mousemove",function (e) {
            e=zzz.incidence.interpret(e);
            zzz.api.download.targetNode=e.target;
        });
         */
        zzz.incidence.bind(document.body, "keydown", zzz.api.download.display);
    },
    display: function (e) {
        e = zzz.incidence.interpret(e);
        zzz.api.download.targetNode = zzz.incidence.data.target;
        if (e.key === "d") {
            let result = zzz.api.download.analyze(zzz.api.download.targetNode);
            let index = 1;
            if (result) {
                let text = "";
                for (let k of result) {
                    //text+="<p>"+index+"<a href='"+k+"' download>"+k+"</a></p>";
                    text += "<p onclick='zzz.api.download.downloadByLocalMachine(this)'>" + k + "</p>";
                    index++;
                }
                zzz.get.id(zzz.api.download.uniqueName).innerHTML = text;
            }
        }
    },
    downloadByLocalMachine: function (node) {
        var name = prompt("name=");
        var url = node.innerText;
        var isTieba = zzz.api.tieba.isTieba;
        if (isTieba) url = zzz.api.tieba.convertImg(url);
        var send_url = zzz.path.merge("http://localhost:5000/", {
            url: url,
            name: name || "",
            isTieba: isTieba
        });
        console.log(send_url);
        zzz.fetch.get(send_url);
    }
};

//notification API
zzz.browser.notification = {
    previousNotification: zzz.structure.stack(),
    //options={body,icon,lang,dir}
    send: function (title, options) {
        try {
            if (zzz.browser.canNotify) {
                return new window.Notification(title, options);
            } else {
                return;
            }
        } catch (e) {

        }
    },
    create: function (title, body, tag, onshow, onclick, onclose, onerror) {
        try {
            var n = new Notification(title, {
                body: body || null,
                tag: tag || null
            });
            if (onshow) n.onshow = onshow;
            if (onshow) n.onclick = onclick;
            if (onshow) n.onclose = onclose;
            if (onshow) n.onerror = onerror;
        } catch (e) {

        }
    },
    title: function (title, elapse, callback) {
        zzz.browser.notification.previousNotification.push(document.title);
        document.title = title;
        if (elapse) {
            setTimeout(function () {
                var title = zzz.browser.notification.previousNotification.top();
                if (title) document.title = title;
                zzz.browser.notification.previousNotification.pop();
            }, elapse);
        }
    }
};
zzz.api.tongji = {
    init: function () {
        var paths = zzz.path.split(zzz.browser.uri);
        if (paths.protocol === "file:" || paths.host.search("localhost") === 0) this.local = true;
        else if (!this.local) this.send();
    },
    send: function () {
        var defaultService = "baidu";
        this[defaultService]();
    },
    baidu: function () {
        window._hmt = [];
        zzz.fetch.js("https://zzzzzzzsea.gitee.io/tongji.js");
    }
};
//overall initialize
zzz.init = function () {
    let funcs = [zzz.storage, zzz.incidence, zzz.browser, zzz.message, zzz.paint, zzz.fetch, zzz.api.tongji];
    for (let i of funcs) i.init();
    zzz.inited = true;
    try {
        window.zzzloaded && window.zzzloaded();
        document.zzzloaded && document.zzzloaded();
    } catch (e) {

    }
};
zzz.init();