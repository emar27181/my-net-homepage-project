/** Canvas text reads the same CSS roles as HTML, including mode and viewport changes. */
export function getChartFont(role: 'small' | 'body' | 'subtitle' = 'small') {
  const css = getComputedStyle(document.documentElement);
  const size = Number.parseFloat(css.getPropertyValue(`--fs-${role}`));
  if (!Number.isFinite(size)) throw new Error(`Missing typography token: --fs-${role}`);
  return { family: css.getPropertyValue('--font-ui').trim(), size };
}

const installed = new WeakSet<object>();
export function installChartTypography(Chart: any) {
  if (!Chart || installed.has(Chart)) return;
  installed.add(Chart);
  Chart.register({
    id: 'portfolioTypography',
    beforeUpdate(chart: any) {
      const options = chart.config.options;
      const small = getChartFont('small');
      const body = getChartFont('body');
      options.font = small;
      for (const scale of Object.values(options.scales ?? {}) as any[]) {
        scale.ticks ??= {};
        scale.ticks.font = small;
        if (scale.title) scale.title.font = small;
      }
      const plugins = options.plugins ??= {};
      if (plugins.legend !== false) {
        plugins.legend ??= {};
        plugins.legend.labels ??= {};
        plugins.legend.labels.font = small;
      }
      if (plugins.tooltip !== false) {
        plugins.tooltip ??= {};
        plugins.tooltip.titleFont = body;
        plugins.tooltip.bodyFont = body;
        plugins.tooltip.footerFont = small;
      }
      for (const name of ['title', 'subtitle']) {
        if (plugins[name]) plugins[name].font = getChartFont('subtitle');
      }
    },
  });
  let frame = 0;
  const refresh = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      Object.values(Chart.instances).forEach((chart: any) => chart.update('none'));
    });
  };
  new MutationObserver(refresh).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-display-mode'],
  });
  window.addEventListener('resize', refresh);
  window.addEventListener('orientationchange', refresh);
}
