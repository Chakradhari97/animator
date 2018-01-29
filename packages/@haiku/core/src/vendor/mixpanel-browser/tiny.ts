export default function tiny() {
  if (typeof window === 'undefined') {
    return null;
  }
  if (typeof document === 'undefined') {
    return null;
  }

  function setup(doc, a) {
    if (!a.__SV) {
      const b = window;
      let c;
      let l;
      let i;
      let j;
      let g;

      try {
        j = b.location;
        g = j.hash;

        const cFunc = function cFunc(cFuncA, cFuncB) {
          return (l = cFuncA.match(RegExp(cFuncB + '=([^&]*)'))) ? l[1] : null;
        };

        g &&
        cFunc(g, 'state') &&
        (
          (i = JSON.parse(decodeURIComponent(cFunc(g, 'state')))),
          'mpeditor' === i.action &&
          (
            b.sessionStorage.setItem('_mpcehash', g),
              history.replaceState(
                i.desiredHash || '',
                doc.title,
                j.pathname + j.search,
              )
          )
        );
      } catch (exception) {
        // empty
      }

      let arrayOfWords = [];

      window['mixpanel'] = a;

      a._i = [];

      a.init = function init(initB, initC, initF) {
        function splitterPusher(spArray, spString) {
          const strParts = spString.split('.');
          2 == strParts.length && ((spArray = spArray[strParts[0]]), (spString = strParts[1]));
          spArray[spString] = function () {
            spArray.push([spString].concat(Array.prototype.slice.call(arguments, 0)));
          };
        }

        let d = a;

        if ('undefined' !== typeof initF) {
          d = a[initF] = [];
        } else {
          initF = 'mixpanel';
        }

        d.people = d.people || [];

        d.toString = function toString1(toStringArg) {
          let mpString = 'mixpanel';
          'mixpanel' !== initF && (mpString += '.' + initF);
          toStringArg || (mpString += ' (stub)');
          return mpString;
        };

        d.people.toString = function toString2() {
          return d.toString(1) + '.people (stub)';
        };

        arrayOfWords =
          'disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user'.split(
            ' ');

        for (let h = 0; h < arrayOfWords.length; h++) {
          splitterPusher(d, arrayOfWords[h]);
        }

        a._i.push([initB, initC, initF]);
      };

      a.__SV = 1.2;

      const script = doc.createElement('script');
      script.type = 'text/javascript';
      script.async = !0;
      script.src = ('file:' === doc.location.protocol && '//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js'.match(/^\/\//))
        ? 'https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js'
        : '//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js';

      if (c && c.parentNode) {
        c.parentNode.insertBefore(b, c);
      }
    }

    return a;
  }

  return setup(document, window['mixpanel'] || []);
}
