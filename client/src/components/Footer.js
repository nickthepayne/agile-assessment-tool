import React from 'react';
import logo from '../assets/images/logo-zuhlke.svg';

export default () => (
  <div>
    <div className="zue-brick zue-col-area bg-gray-light zue-oss-header">
      <div className="row">
        <div>
          <div className="columns">
            <p className="headersize-6">
              <span>Zuhlke is your&nbsp;</span>
              <strong>partner for business innovation</strong>
              <span>. By combining both&nbsp;</span>
              <strong>business and technology expertise</strong>
              <span>, we create solutions that satisfy our customers. We develop&nbsp;</span>
              <strong>financially successful products, services and business models</strong>
              <span>
                &nbsp;for today’s digital world – from coming up with the initial idea through to
                the implementation and operation. We can achieve this by drawing on the experience
                of&nbsp;
              </span>
              <strong>1,000 in-house experts</strong>
              <span>&nbsp;and of more than&nbsp;</span>
              <strong>10,000</strong>
              <span>&nbsp;successful projects.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div className="row">
        <div className="small-12 medium-8 columns">
          <div className="row">
            <div className="small-12 medium-2 columns">
              <a href="http://zuehlke.com/" className="zue-logo-foot-wrap">
                <img className="zue-logo-foot" alt="Zühlke" src={logo} style={{ width: '120px' }} />
              </a>
            </div>
            <div className="small-12 medium-4 columns">
              <ul className="zue-footer-list">
                <li>
                  <a href="http://www.zuehlke.com/ch/en/markettrends/" rel="noopener">
                    Market Trends
                  </a>
                </li>

                <li>
                  <a href="http://www.zuehlke.com/ch/en/success-stories/" rel="noopener">
                    Success Stories
                  </a>
                </li>

                <li>
                  <a href="http://www.zuehlke.com/ch/en/industries/" rel="noopener">
                    Industries
                  </a>
                </li>

                <li>
                  <a href="http://www.zuehlke.com/ch/en/about-us/" rel="noopener">
                    About us
                  </a>
                </li>

                <li>
                  <a href="http://www.zuehlke.com/ch/en/about-us/contact/" rel="noopener">
                    Contact
                  </a>
                </li>

                <li>
                  <a href="http://www.zuehlke.com/ch/en/legal/" rel="noopener">
                    Legal
                  </a>
                </li>

                <li>
                  <a href="http://www.zuehlke.com/ch/en/terms-use/" rel="noopener">
                    Terms of Use
                  </a>
                </li>

                <li>
                  <a href="http://www.zuehlke.com/ch/en/privacy-policy/" rel="noopener">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div className="small-12 medium-6 columns">
              <ul className="zue-footer-list">
                Open Source
                <li>
                  <a href="https://github.com/Zuehlke" rel="noopener">
                    Zühlke Github
                  </a>
                </li>
                <li>
                  <a href="http://blog.zuehlke.com/all/" rel="noopener">
                    Zühlke Github.io
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="small-12 medium-4 columns">
          <h6>Stay in touch</h6>
          <ul className="zue-plain-list zue-social-list">
            <li>
              <a href="http://blog.zuehlke.com/" title="Blog" rel="noopener">
                <i className="icon-Blog" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/zuehlke.group" title="Facebook" rel="noopener">
                <i className="icon-Facebook" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/zuehlke_group" title="Twitter" rel="noopener">
                <i className="icon-Twitter" />
              </a>
            </li>
            <li>
              <a href="https://www.xing.com/" title="Xing" rel="noopener">
                <i className="icon-Xing" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/z-hlke-group/"
                title="LinkedIn"
                rel="noopener"
              >
                <i className="icon-Linkedin" />
              </a>
            </li>
            <li>
              <a
                href="http://www.kununu.com/de/all/de/it/zuehlke-engineering/"
                title="Kununu"
                rel="noopener"
              >
                <i className="icon-Kununu" />
              </a>
            </li>
            <li>
              <a href="http://www.slideshare.net/Zuehlke" title="Slideshare">
                <i className="icon-Slideshare" rel="noopener" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/user/zuehlkeengineering" title="Youtube">
                <i className="icon-Youtube" rel="noopener" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
);
