export default class Analytics {
  static gtag() {
    if (process.env.NODE_ENV === 'production') {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    }
  }

  static viewPage(path) {
    this.gtag('config', 'UA-141216364-1', {
      page_path: path,
    });
  }

  static event(name, category) {
    this.gtag('event', name, {
      event_category: category,
    });
  }

  static setUp() {
    window.dataLayer = window.dataLayer || [];

    this.gtag('js', new Date());
    this.viewPage();
    this.event('started', 'survey');
  }
}
