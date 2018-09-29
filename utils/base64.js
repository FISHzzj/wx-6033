! function() {
  var r = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"],
    n = function(r) {
      for (var n = new Array; r > 0;) {
        var t = r % 2;
        r = Math.floor(r / 2), n.push(t)
      }
      return n.reverse(), n
    },
    t = function(r) {
      for (var n = 0, t = 0, o = r.length - 1; o >= 0; --o) {
        1 == r[o] && (n += Math.pow(2, t)), ++t
      }
      return n
    },
    o = function(r, n) {
      for (var t = 8 - (r + 1) + 6 * (r - 1), o = n.length, a = t - o; --a >= 0;) n.unshift(0);
      for (var c = [], e = r; --e >= 0;) c.push(1);
      c.push(0);
      for (var f = 0, h = 8 - (r + 1); f < h; ++f) c.push(n[f]);
      for (var u = 0; u < r - 1; ++u) {
        c.push(1), c.push(0);
        for (var s = 6; --s >= 0;) c.push(n[f++])
      }
      return c
    },
    a = {
      encoder: function(a) {
        for (var c = [], e = [], f = 0, h = a.length; f < h; ++f) {
          var u = a.charCodeAt(f),
            s = n(u);
          if (u < 128) {
            for (var v = 8 - s.length; --v >= 0;) s.unshift(0);
            e = e.concat(s)
          } else u >= 128 && u <= 2047 ? e = e.concat(o(2, s)) : u >= 2048 && u <= 65535 ? e = e.concat(o(3, s)) : u >= 65536 && u <= 2097151 ? e = e.concat(o(4, s)) : u >= 2097152 && u <= 67108863 ? e = e.concat(o(5, s)) : u >= 4e6 && u <= 2147483647 && (e = e.concat(o(6, s)))
        }
        for (var i = 0, f = 0, h = e.length; f < h; f += 6) {
          var l = f + 6 - h;
          2 == l ? i = 2 : 4 == l && (i = 4);
          for (var g = i; --g >= 0;) e.push(0);
          c.push(t(e.slice(f, f + 6)))
        }
        for (var p = "", f = 0, h = c.length; f < h; ++f) p += r[c[f]];
        for (var f = 0, h = i / 2; f < h; ++f) p += "=";
        return p
      },
      decoder: function(o) {
        var a = o.length,
          c = 0;
        "=" == o.charAt(a - 1) && ("=" == o.charAt(a - 2) ? (c = 4, o = o.substring(0, a - 2)) : (c = 2, o = o.substring(0, a - 1)));
        for (var e = [], f = 0, h = o.length; f < h; ++f)
          for (var u = o.charAt(f), s = 0, v = r.length; s < v; ++s)
            if (u == r[s]) {
              var i = n(s),
                l = i.length;
              if (6 - l > 0)
                for (var g = 6 - l; g > 0; --g) i.unshift(0);
              e = e.concat(i);
              break
            }
        c > 0 && (e = e.slice(0, e.length - c));
        for (var p = [], A = [], f = 0, h = e.length; f < h;)
          if (0 == e[f]) p = p.concat(t(e.slice(f, f + 8))), f += 8;
          else {
            for (var d = 0; f < h && 1 == e[f];) ++d, ++f;
            for (A = A.concat(e.slice(f + 1, f + 8 - d)), f += 8 - d; d > 1;) A = A.concat(e.slice(f + 2, f + 8)), f += 8, --d;
            p = p.concat(t(A)), A = []
          }
        return p
      }
    };
  window.BASE64 = a
}()