/* quick-picker.js — reusable bottom-sheet plan picker for every page */
(function () {

  var overlay, sheet, _config;

  function buildOverlay() {
    var el = document.createElement('div');
    el.id = 'qp-overlay';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.style.cssText = [
      'display:none',
      'position:fixed',
      'inset:0',
      'z-index:10000',
      'background:rgba(0,0,0,0.55)',
      'backdrop-filter:blur(3px)',
      'align-items:flex-end',
      'justify-content:center',
    ].join(';');
    el.innerHTML = [
      '<div id="qp-sheet" style="',
        'background:#0d141c;',
        'border:1px solid rgba(255,255,255,0.1);',
        'border-radius:20px 20px 0 0;',
        'padding:20px 20px 32px;',
        'width:100%;',
        'max-width:520px;',
        'box-sizing:border-box;',
        'transform:translateY(100%);',
        'transition:transform 0.28s cubic-bezier(0.32,0.72,0,1);',
      '">',
        '<div id="qp-drag" style="width:40px;height:4px;border-radius:2px;background:rgba(255,255,255,0.2);margin:0 auto 20px;cursor:pointer;"></div>',
        '<h3 id="qp-headline" style="font-size:1.1rem;font-weight:700;color:#fff;margin:0 0 16px;text-align:center;"></h3>',
        '<div id="qp-options"></div>',
        '<p id="qp-note" style="font-size:0.78rem;color:rgba(255,255,255,0.45);text-align:center;margin:16px 0 0;"></p>',
      '</div>',
    ].join('');
    return el;
  }

  function renderOptions(options) {
    var container = document.getElementById('qp-options');
    container.innerHTML = '';
    options.forEach(function (opt, i) {
      var row = document.createElement('button');
      row.type = 'button';
      row.style.cssText = [
        'display:flex',
        'justify-content:space-between',
        'align-items:center',
        'width:100%',
        'padding:14px 18px',
        'margin-bottom:8px',
        'border-radius:12px',
        'border:1px solid ' + (opt.highlight ? 'rgba(0,113,227,0.6)' : 'rgba(255,255,255,0.1)'),
        'background:' + (opt.highlight ? 'rgba(0,113,227,0.12)' : 'rgba(255,255,255,0.04)'),
        'cursor:pointer',
        'text-align:left',
        'font-family:inherit',
        'box-sizing:border-box',
      ].join(';');
      row.innerHTML = [
        '<div style="flex:1;min-width:0;">',
          '<span style="display:block;font-size:0.95rem;font-weight:600;color:#fff;line-height:1.3;">' + opt.label + '</span>',
          opt.sub ? '<span style="display:block;font-size:0.8rem;font-weight:500;color:' + (opt.highlight ? '#93c5fd' : 'rgba(255,255,255,0.62)') + ';margin-top:3px;">' + opt.sub + '</span>' : '',
        '</div>',
        '<span style="font-size:1rem;color:rgba(255,255,255,0.35);margin-left:12px;flex-shrink:0;">›</span>',
      ].join('');
      row.addEventListener('click', function () {
        close();
        if (typeof opt.action === 'function') {
          opt.action();
        } else if (opt.href) {
          var isExternal = /^https?:\/\//.test(opt.href);
          if (isExternal) {
            window.open(opt.href, '_blank', 'noopener');
          } else {
            window.location.href = opt.href;
          }
        }
      });
      container.appendChild(row);
    });
  }

  function open(config) {
    _config = config;
    if (!overlay) {
      overlay = buildOverlay();
      document.body.appendChild(overlay);
      document.getElementById('qp-drag').addEventListener('click', close);
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) close();
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
      });
    }
    document.getElementById('qp-headline').textContent = config.headline || 'Choose a Plan';
    document.getElementById('qp-note').textContent = config.note || '';
    renderOptions(config.options || []);

    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.getElementById('qp-sheet').style.transform = 'translateY(0)';
      });
    });
  }

  function close() {
    if (!overlay) return;
    var s = document.getElementById('qp-sheet');
    s.style.transform = 'translateY(100%)';
    setTimeout(function () {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 280);
  }

  window.QuickPicker = { open: open, close: close };

})();
