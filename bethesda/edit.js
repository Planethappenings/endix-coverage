// Edit mode: open the page with ?edit=1, click any text and rewrite it, then copy the changes and paste them to Claude.
// Nothing is saved to the site from here. Drafts are kept in this browser only.
(function () {
  if (!/[?&]edit=1/.test(location.search)) return;
  var KEY = 'bethesda-edit-draft';
  var draft = {};
  try { draft = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  var norm = function (s) { return String(s).replace(/\s+/g, ' ').trim(); };

  var style = document.createElement('style');
  style.textContent =
    '[data-edit]{outline:1px dashed rgba(240,192,79,.35);outline-offset:2px;cursor:text}' +
    '[data-edit]:hover{outline-color:rgba(240,192,79,.8)}' +
    '[data-edit]:focus{outline:2px solid #f0c04f;background:rgba(240,192,79,.08)}' +
    '[data-edit].changed{outline:2px solid #6fd08c}' +
    '#edit-bar{position:fixed;left:0;right:0;bottom:0;z-index:999;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:center;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));background:rgba(8,9,10,.96);border-top:1px solid #d29b2e;font:600 13px Inter,system-ui,sans-serif;color:#f3f1ec}' +
    '#edit-bar button{font:inherit;padding:9px 16px;border:1px solid #d29b2e;background:#d29b2e;color:#08090a;cursor:pointer}' +
    '#edit-bar button.ghost{background:transparent;color:#f0c04f}' +
    'body{padding-bottom:80px}';
  document.head.appendChild(style);

  var nodes = [];
  var walk = function (el) {
    if (/^(SCRIPT|STYLE|SVG|svg)$/.test(el.tagName) || el.id === 'edit-bar') return;
    var direct = false;
    for (var i = 0; i < el.childNodes.length; i++) if (el.childNodes[i].nodeType === 3 && el.childNodes[i].nodeValue.trim()) direct = true;
    if (direct) { nodes.push(el); return; }
    for (var j = 0; j < el.children.length; j++) walk(el.children[j]);
  };
  walk(document.body);

  var bar = document.createElement('div');
  bar.id = 'edit-bar';
  bar.innerHTML = '<span id="edit-count"></span><button id="edit-copy">Copy changes</button><button class="ghost" id="edit-reset">Reset all</button>';
  document.body.appendChild(bar);
  var count = document.getElementById('edit-count');

  var changes = function () {
    return nodes.filter(function (n) { return norm(n.innerText) !== n.getAttribute('data-orig'); })
      .map(function (n) { return { old: n.getAttribute('data-orig'), now: norm(n.innerText) }; });
  };
  var refresh = function () {
    var d = {};
    nodes.forEach(function (n) {
      var ch = norm(n.innerText) !== n.getAttribute('data-orig');
      n.classList.toggle('changed', ch);
      if (ch) d[n.getAttribute('data-orig')] = n.innerText;
    });
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
    var c = Object.keys(d).length;
    count.textContent = c ? c + (c === 1 ? ' change' : ' changes') + ', not saved to the site yet' : 'Edit mode: click any text to change it';
  };

  nodes.forEach(function (n) {
    var orig = norm(n.innerText);
    n.setAttribute('data-orig', orig);
    n.setAttribute('data-edit', '');
    n.setAttribute('contenteditable', 'plaintext-only');
    if (n.contentEditable !== 'plaintext-only') n.setAttribute('contenteditable', 'true');
    n.spellcheck = false;
    if (draft[orig] != null) n.innerText = draft[orig];
    n.addEventListener('input', refresh);
  });
  // Links should not open while editing
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (a && !a.closest('#edit-bar')) e.preventDefault();
  }, true);

  document.getElementById('edit-copy').addEventListener('click', function () {
    var ch = changes();
    if (!ch.length) { count.textContent = 'No changes yet'; return; }
    var text = 'Text changes for the Bethesda pitch:\n\n' + ch.map(function (c, i) {
      return (i + 1) + '.\nOLD: ' + c.old + '\nNEW: ' + c.now;
    }).join('\n\n');
    var done = function () { count.textContent = ch.length + ' copied. Paste them to Claude.'; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    function fallback() {
      var t = document.createElement('textarea');
      t.value = text; t.style.cssText = 'position:fixed;left:8px;right:8px;bottom:90px;height:40vh;z-index:1000;width:calc(100% - 16px)';
      document.body.appendChild(t); t.select();
      count.textContent = 'Copy the text in the box and paste it to Claude.';
    }
  });
  document.getElementById('edit-reset').addEventListener('click', function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.reload();
  });
  refresh();
})();
