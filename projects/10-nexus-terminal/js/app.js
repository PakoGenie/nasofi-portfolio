/**
 * NEXUS PRIME | Institutional Multi-Asset Algorithmic Trading Terminal
 * High-Density Client Engine: HTML5 Canvas Candlestick Engine, Live DOM Order Book,
 * Multi-Asset Watchlist, Execution Ticket, and Margin Risk Telemetry.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Global Market Data State
  const marketState = {
    activeAsset: 'BTC-USD',
    price: 88450.00,
    symbol: 'BTC/USD',
    unit: 'BTC',
    tickSize: 0.50,
    leverage: 10,
    side: 'buy', // 'buy' or 'sell'
    orderType: 'market',
    emaEnabled: true,
    volEnabled: true,
    timeframe: '5m'
  };

  const assetConfigs = {
    'BTC-USD': { name: 'BTC/USD', unit: 'BTC', price: 88450.00, high: 89200.00, low: 85110.00, vol: '$1.42B', tick: 0.5 },
    'ETH-USD': { name: 'ETH/USD', unit: 'ETH', price: 3485.50, high: 3540.00, low: 3390.00, vol: '$820M', tick: 0.1 },
    'SOL-USD': { name: 'SOL/USD', unit: 'SOL', price: 182.40, high: 188.00, low: 179.50, vol: '$410M', tick: 0.05 },
    'NVDA': { name: 'NVDA', unit: 'SHR', price: 143.20, high: 146.50, low: 141.00, vol: '$3.8B', tick: 0.01 },
    'XAU-USD': { name: 'XAU/GOLD', unit: 'OZ', price: 2748.10, high: 2760.00, low: 2735.00, vol: '$650M', tick: 0.1 }
  };

  // 3. Generate Initial Candlestick Data Series
  let candles = [];
  function generateCandleData(basePrice) {
    candles = [];
    let current = basePrice * 0.985;
    const count = 48;

    for (let i = 0; i < count; i++) {
      const delta = (Math.random() - 0.48) * (basePrice * 0.0035);
      const open = current;
      const close = current + delta;
      const high = Math.max(open, close) + Math.random() * (basePrice * 0.002);
      const low = Math.min(open, close) - Math.random() * (basePrice * 0.002);
      const volume = Math.floor(Math.random() * 50 + 10);

      candles.push({ open, close, high, low, volume });
      current = close;
    }
    marketState.price = candles[candles.length - 1].close;
  }

  generateCandleData(marketState.price);

  // 4. HTML5 Canvas Candlestick & Indicator Renderer
  const canvas = document.getElementById('candleCanvas');
  const viewport = document.getElementById('chartViewport');
  const inspectPill = document.getElementById('chartInspectPill');
  let ctx = canvas ? canvas.getContext('2d') : null;

  function resizeCanvas() {
    if (!canvas || !viewport) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = viewport.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    drawChart();
  });
  resizeCanvas();

  // Moving Average Helper
  function calculateEMA(data, period) {
    const k = 2 / (period + 1);
    const emaArray = [];
    let prev = data[0].close;

    for (let i = 0; i < data.length; i++) {
      const val = data[i].close * k + prev * (1 - k);
      emaArray.push(val);
      prev = val;
    }
    return emaArray;
  }

  let mouseX = -1;
  let mouseY = -1;

  if (viewport) {
    viewport.addEventListener('mousemove', (e) => {
      const rect = viewport.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      drawChart();
    });

    viewport.addEventListener('mouseleave', () => {
      mouseX = -1;
      mouseY = -1;
      drawChart();
    });
  }

  function drawChart() {
    if (!ctx || !canvas || !viewport) return;
    const rect = viewport.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    if (candles.length === 0) return;

    // Price Bounds
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let maxVol = 0;

    candles.forEach(c => {
      if (c.low < minPrice) minPrice = c.low;
      if (c.high > maxPrice) maxPrice = c.high;
      if (c.volume > maxVol) maxVol = c.volume;
    });

    // Padding
    const range = maxPrice - minPrice || 1;
    minPrice -= range * 0.08;
    maxPrice += range * 0.08;
    const totalRange = maxPrice - minPrice;

    const chartPaddingRight = 70; // Price axis
    const chartPaddingBottom = 30; // Time axis
    const chartAreaW = w - chartPaddingRight;
    const chartAreaH = h - chartPaddingBottom;
    const volAreaH = chartAreaH * 0.22;

    function priceToY(price) {
      return chartAreaH - ((price - minPrice) / totalRange) * (chartAreaH - 40) - 20;
    }

    // Horizontal Gridlines & Price Ticks
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillStyle = '#64748b';
    ctx.font = '10px JetBrains Mono';
    ctx.textAlign = 'left';

    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const gridPrice = minPrice + (totalRange / gridLines) * i;
      const y = priceToY(gridPrice);

      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(chartAreaW, y);
      ctx.stroke();

      ctx.fillText(gridPrice.toFixed(2), chartAreaW + 8, y + 3);
    }

    // Candle metrics
    const candleCount = candles.length;
    const candleWidth = Math.max(3, (chartAreaW / candleCount) * 0.65);
    const step = chartAreaW / candleCount;

    // Draw Volume Bars
    if (marketState.volEnabled) {
      candles.forEach((c, i) => {
        const x = i * step + step / 2;
        const vH = (c.volume / (maxVol || 1)) * volAreaH;
        const vY = chartAreaH - vH;

        ctx.fillStyle = c.close >= c.open ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)';
        ctx.fillRect(x - candleWidth / 2, vY, candleWidth, vH);
      });
    }

    // Draw Candlesticks
    candles.forEach((c, i) => {
      const x = i * step + step / 2;
      const yOpen = priceToY(c.open);
      const yClose = priceToY(c.close);
      const yHigh = priceToY(c.high);
      const yLow = priceToY(c.low);

      const isGreen = c.close >= c.open;
      const candleColor = isGreen ? '#10b981' : '#f43f5e';

      // Wick
      ctx.strokeStyle = candleColor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x, yHigh);
      ctx.lineTo(x, yLow);
      ctx.stroke();

      // Body
      const bodyTop = Math.min(yOpen, yClose);
      const bodyH = Math.max(2, Math.abs(yClose - yOpen));
      ctx.fillStyle = candleColor;
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyH);
    });

    // Draw EMAs (EMA 20 = Cyan, EMA 50 = Gold)
    if (marketState.emaEnabled) {
      const ema20 = calculateEMA(candles, 20);
      const ema50 = calculateEMA(candles, 40);

      function drawEMALine(series, strokeColor) {
        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.5;
        series.forEach((val, i) => {
          const x = i * step + step / 2;
          const y = priceToY(val);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
      }

      drawEMALine(ema20, '#06b6d4');
      drawEMALine(ema50, '#f59e0b');
    }

    // Mouse Crosshair & Inspector Pill
    if (mouseX >= 0 && mouseX <= chartAreaW && mouseY >= 0 && mouseY <= chartAreaH) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.setLineDash([3, 3]);

      // Vertical
      ctx.beginPath();
      ctx.moveTo(mouseX, 0);
      ctx.lineTo(mouseX, chartAreaH);
      ctx.stroke();

      // Horizontal
      ctx.beginPath();
      ctx.moveTo(0, mouseY);
      ctx.lineTo(chartAreaW, mouseY);
      ctx.stroke();

      ctx.setLineDash([]);

      // Compute Hover Price
      const hoverFraction = (chartAreaH - 20 - mouseY) / (chartAreaH - 40);
      const hoverPrice = minPrice + hoverFraction * totalRange;

      // Price Tag on Right
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(chartAreaW + 2, mouseY - 10, 65, 20);
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.fillText(hoverPrice.toFixed(2), chartAreaW + 6, mouseY + 4);

      // Closest Candle Inspector
      const hoverIndex = Math.min(candles.length - 1, Math.max(0, Math.floor(mouseX / step)));
      const inspected = candles[hoverIndex];
      if (inspectPill && inspected) {
        inspectPill.innerHTML = `O: <strong>${inspected.open.toFixed(2)}</strong> • H: <strong>${inspected.high.toFixed(2)}</strong> • L: <strong>${inspected.low.toFixed(2)}</strong> • C: <strong>${inspected.close.toFixed(2)}</strong> • V: <strong>${inspected.volume}</strong>`;
      }
    }
  }

  // 5. Real-Time Tick Simulation (Candle growth & order matching)
  function simulateMarketTick() {
    if (candles.length === 0) return;

    const last = candles[candles.length - 1];
    const microDelta = (Math.random() - 0.49) * (marketState.price * 0.0008);
    const newPrice = Number((last.close + microDelta).toFixed(2));

    last.close = newPrice;
    if (newPrice > last.high) last.high = newPrice;
    if (newPrice < last.low) last.low = newPrice;
    last.volume += Math.floor(Math.random() * 3);

    marketState.price = newPrice;

    // Update Header Ticker & DOM Mid Price
    const topBtc = document.getElementById('topBtcPrice');
    const obMid = document.getElementById('obMidPrice');
    const posMark = document.getElementById('posMarkPrice');
    const posPnl = document.getElementById('posPnlVal');

    if (marketState.activeAsset === 'BTC-USD') {
      if (topBtc) topBtc.textContent = `$${newPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
      if (obMid) obMid.textContent = `${newPrice.toFixed(2)} ${microDelta >= 0 ? '↑' : '↓'}`;
      if (posMark) posMark.textContent = `$${newPrice.toFixed(2)}`;

      // Update Open Position PnL
      if (posPnl) {
        const entry = 86210.00;
        const btcSize = 4.50;
        const pnl = (newPrice - entry) * btcSize;
        const pnlPct = ((newPrice - entry) / entry) * 100 * 10;
        posPnl.className = pnl >= 0 ? 'text-emerald' : 'text-rose';
        posPnl.textContent = `${pnl >= 0 ? '+' : ''}$${pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${pnlPct >= 0 ? '+' : ''}${pnlPct.toFixed(2)}%)`;
      }
    }

    drawChart();
  }

  setInterval(simulateMarketTick, 900);

  // Periodically add new candle (every 18 seconds)
  setInterval(() => {
    if (candles.length > 55) candles.shift();
    const lastClose = candles[candles.length - 1].close;
    candles.push({
      open: lastClose,
      close: lastClose,
      high: lastClose,
      low: lastClose,
      volume: 1
    });
  }, 18000);

  // 6. Watchlist Asset Switching
  const watchlistRows = document.querySelectorAll('.watchlist-row');
  const activeSymbolTitle = document.getElementById('activeSymbolDisplay');
  const stat24High = document.getElementById('stat24High');
  const stat24Low = document.getElementById('stat24Low');
  const stat24Vol = document.getElementById('stat24Vol');
  const orderSizeUnit = document.getElementById('orderSizeUnit');

  watchlistRows.forEach(row => {
    row.addEventListener('click', () => {
      watchlistRows.forEach(r => r.classList.remove('active'));
      row.classList.add('active');

      const assetKey = row.getAttribute('data-asset');
      const conf = assetConfigs[assetKey];
      if (!conf) return;

      marketState.activeAsset = assetKey;
      marketState.symbol = conf.name;
      marketState.unit = conf.unit;
      marketState.price = conf.price;

      if (activeSymbolTitle) activeSymbolTitle.textContent = conf.name;
      if (stat24High) stat24High.textContent = `$${conf.high.toLocaleString()}`;
      if (stat24Low) stat24Low.textContent = `$${conf.low.toLocaleString()}`;
      if (stat24Vol) stat24Vol.textContent = conf.vol;
      if (orderSizeUnit) orderSizeUnit.textContent = conf.unit;

      generateCandleData(conf.price);
      drawChart();
      updateOrderCalculations();
    });
  });

  // 7. Timeframe and Indicator Toggles
  document.querySelectorAll('.timeframe-group .tf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.timeframe-group .tf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      marketState.timeframe = btn.getAttribute('data-tf');
      generateCandleData(marketState.price);
      drawChart();
    });
  });

  const btnToggleEma = document.getElementById('btnToggleEma');
  if (btnToggleEma) {
    btnToggleEma.addEventListener('click', () => {
      marketState.emaEnabled = !marketState.emaEnabled;
      btnToggleEma.classList.toggle('active', marketState.emaEnabled);
      drawChart();
    });
  }

  const btnToggleVol = document.getElementById('btnToggleVol');
  if (btnToggleVol) {
    btnToggleVol.addEventListener('click', () => {
      marketState.volEnabled = !marketState.volEnabled;
      btnToggleVol.classList.toggle('active', marketState.volEnabled);
      drawChart();
    });
  }

  // 8. Order Ticket Execution Logic
  const btnSideBuy = document.getElementById('btnSideBuy');
  const btnSideSell = document.getElementById('btnSideSell');
  const inputOrderSize = document.getElementById('inputOrderSize');
  const sizeUsdEquiv = document.getElementById('sizeUsdEquiv');
  const leverageRange = document.getElementById('leverageRange');
  const leverageValDisplay = document.getElementById('leverageValDisplay');
  const reqMarginDisplay = document.getElementById('reqMarginDisplay');
  const estLiqDisplay = document.getElementById('estLiqDisplay');
  const btnSubmitOrder = document.getElementById('btnSubmitOrder');
  const btnExecuteText = document.getElementById('btnExecuteText');

  function updateOrderCalculations() {
    const size = parseFloat(inputOrderSize.value) || 0;
    const lev = parseInt(leverageRange.value) || 10;
    const price = marketState.price;
    const notionalUsd = size * price;

    if (sizeUsdEquiv) {
      sizeUsdEquiv.textContent = `≈ $${notionalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
    }

    const margin = notionalUsd / lev;
    if (reqMarginDisplay) {
      reqMarginDisplay.textContent = `$${margin.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Estimated Liquidation
    let estLiq = 0;
    if (marketState.side === 'buy') {
      estLiq = price * (1 - (1 / lev) * 0.9);
    } else {
      estLiq = price * (1 + (1 / lev) * 0.9);
    }
    if (estLiqDisplay) {
      estLiqDisplay.textContent = `$${estLiq.toFixed(2)}`;
    }

    // Execute Button Text
    if (btnExecuteText) {
      const sideText = marketState.side === 'buy' ? 'LONG' : 'SHORT';
      btnExecuteText.textContent = `EXECUTE ${sideText} (${size} ${marketState.unit})`;
    }
  }

  if (btnSideBuy && btnSideSell) {
    btnSideBuy.addEventListener('click', () => {
      marketState.side = 'buy';
      btnSideBuy.classList.add('active');
      btnSideSell.classList.remove('active');
      btnSubmitOrder.className = 'btn-execute btn-execute-buy full-width';
      updateOrderCalculations();
    });

    btnSideSell.addEventListener('click', () => {
      marketState.side = 'sell';
      btnSideSell.classList.add('active');
      btnSideBuy.classList.remove('active');
      btnSubmitOrder.className = 'btn-execute btn-execute-sell full-width';
      updateOrderCalculations();
    });
  }

  if (inputOrderSize) {
    inputOrderSize.addEventListener('input', updateOrderCalculations);
  }

  if (leverageRange) {
    leverageRange.addEventListener('input', () => {
      const lev = leverageRange.value;
      marketState.leverage = lev;
      if (leverageValDisplay) leverageValDisplay.textContent = `${lev}x Isolated`;
      updateOrderCalculations();
    });
  }

  // 9. Order Confirmation Modal (<dialog id="orderConfirmationModal">)
  const orderTicketForm = document.getElementById('orderTicketForm');
  const confirmModal = document.getElementById('orderConfirmationModal');
  const btnCloseConfirmModal = document.getElementById('btnCloseConfirmModal');
  const btnCancelOrder = document.getElementById('btnCancelOrder');
  const btnConfirmDispatch = document.getElementById('btnConfirmDispatch');

  const confSymbol = document.getElementById('confSymbol');
  const confSide = document.getElementById('confSide');
  const confSize = document.getElementById('confSize');
  const confLev = document.getElementById('confLev');

  if (orderTicketForm) {
    orderTicketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const size = parseFloat(inputOrderSize.value) || 1.0;
      const notional = size * marketState.price;

      if (confSymbol) confSymbol.textContent = `${marketState.symbol} Perpetual`;
      if (confSide) {
        confSide.textContent = `${marketState.side.toUpperCase()} / ${marketState.orderType.toUpperCase()}`;
        confSide.className = marketState.side === 'buy' ? 'text-emerald' : 'text-rose';
      }
      if (confSize) confSize.textContent = `${size} ${marketState.unit} ($${notional.toLocaleString()})`;
      if (confLev) confLev.textContent = `${marketState.leverage}x Isolated`;

      if (confirmModal) confirmModal.showModal();
    });
  }

  if (btnCloseConfirmModal && confirmModal) {
    btnCloseConfirmModal.addEventListener('click', () => confirmModal.close());
  }
  if (btnCancelOrder && confirmModal) {
    btnCancelOrder.addEventListener('click', () => confirmModal.close());
  }

  if (btnConfirmDispatch && confirmModal) {
    btnConfirmDispatch.addEventListener('click', () => {
      confirmModal.close();

      const size = parseFloat(inputOrderSize.value) || 1.0;
      const sideText = marketState.side === 'buy' ? 'LONG' : 'SHORT';
      const orderId = `FILL_#NX-${Math.floor(100000 + Math.random() * 900000)}`;

      showTerminalToast(`ORDER TRANSMITTED: ${sideText} ${size} ${marketState.unit} @ $${marketState.price.toFixed(2)} (${orderId})`);

      // Add to positions table
      const tbody = document.getElementById('positionsTableBody');
      if (tbody) {
        const tr = document.createElement('tr');
        const isBuy = marketState.side === 'buy';
        tr.innerHTML = `
          <td><strong class="${isBuy ? 'text-emerald' : 'text-rose'}">${marketState.symbol} ${sideText} ${marketState.leverage}x</strong></td>
          <td>${size} ${marketState.unit} ($${(size * marketState.price).toLocaleString()})</td>
          <td>$${marketState.price.toFixed(2)}</td>
          <td class="text-white">$${marketState.price.toFixed(2)}</td>
          <td class="text-rose">$${(marketState.price * 0.9).toFixed(2)}</td>
          <td>$${((size * marketState.price) / marketState.leverage).toFixed(2)}</td>
          <td><strong class="text-emerald">+$0.00 (0.00%)</strong></td>
          <td><button class="btn-xs btn-close-pos" onclick="this.closest('tr').remove();">Close Market</button></td>
        `;
        tbody.prepend(tr);
      }
    });
  }

  // Close Existing Position
  const btnClosePosition = document.getElementById('btnClosePosition');
  if (btnClosePosition) {
    btnClosePosition.addEventListener('click', () => {
      const row = document.getElementById('activeBtcPositionRow');
      if (row) {
        row.remove();
        showTerminalToast('POSITION CLOSED: Realized Profit +$10,080.00 USD credited to Margin Balance.');
      }
    });
  }

  // 10. API Security Modal (<dialog id="apiSecurityModal">)
  const apiModal = document.getElementById('apiSecurityModal');
  const btnOpenApi = document.getElementById('btnOpenApiKeys');
  const btnCloseApi = document.getElementById('btnCloseApiModal');
  const btnCloseApiDrawer = document.getElementById('btnCloseApiDrawer');

  if (btnOpenApi && apiModal) {
    btnOpenApi.addEventListener('click', () => apiModal.showModal());
  }
  if (btnCloseApi && apiModal) {
    btnCloseApi.addEventListener('click', () => apiModal.close());
  }
  if (btnCloseApiDrawer && apiModal) {
    btnCloseApiDrawer.addEventListener('click', () => apiModal.close());
  }

  // 11. Terminal Toast Notification
  function showTerminalToast(msg) {
    let toast = document.getElementById('nexusToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'nexusToast';
      toast.style.cssText = `
        position: fixed;
        top: 68px;
        right: 20px;
        background: #0b101c;
        border: 1px solid #06b6d4;
        color: #f8fafc;
        padding: 10px 18px;
        border-radius: 4px;
        font-family: var(--font-mono);
        font-size: 0.76rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 8px;
        transform: translateY(-30px);
        opacity: 0;
        transition: transform 0.25s ease, opacity 0.25s ease;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#06b6d4;box-shadow:0 0 8px #06b6d4"></span> <span>${msg}</span>`;

    requestAnimationFrame(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.transform = 'translateY(-30px)';
      toast.style.opacity = '0';
    }, 4500);
  }
});
