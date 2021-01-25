/* global Typekit */

export default function ({ app }, inject) {
  const adobeFonts = (d) => {
    const config = {
      kitId        : 'fcz8jqy',
      scriptTimeout: 3000,
      async        : true,
    };
    const h = d.documentElement;
    const t = setTimeout(function () {
      h.className =
          h.className.replace(/\bwf-loading\b/g, '') + ' wf-inactive';
    }, config.scriptTimeout);
    const tk = d.createElement('script');
    const s = d.getElementsByTagName('script')[0];
    h.className += ' wf-loading';
    tk.src = 'https://use.typekit.net/' + config.kitId + '.js';
    tk.async = true;
    tk.onload = tk.onreadystatechange = function () {
      const a = this.readyState;
      let f = false;
      if (f || (a && a !== 'complete' && a !== 'loaded')) { return; }
      f = true;
      clearTimeout(t);
      try {
        Typekit.load(config);
      } catch (e) {}
    };
    s.parentNode.insertBefore(tk, s);
  };

  inject('adobeFonts', adobeFonts);
}
