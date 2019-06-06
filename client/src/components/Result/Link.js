import React from 'react';
import links from '../../assets/links';

export const getRandomLinks = (number) => {
  const allLinks = [
    ...links.team,
    ...links['project/product'],
    ...links.organization,
    ...links.scrum,
  ];

  const resultLinks = [];
  while (allLinks.length > 0 && resultLinks.length < number) {
    const randomIndex = Math.floor(Math.random() * allLinks.length);
    resultLinks.push(allLinks[randomIndex]);
    allLinks.splice(randomIndex, 1);
  }

  return resultLinks;
};

export default () => {
  const linksToDisplay = getRandomLinks(4);
  return (
    <div className="linkSection zue-teaser-medium-boxes zue-boxes-container">
      <h3 className="color-primary">Find out more about Agile</h3>
      <ul className="medium-block-grid-2">
        {linksToDisplay.map((item) => (
          <li className="zue-box-outer card" key={item.title}>
            <a
              className="zue-box-cta font-opensans-bold"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="zue-box-inner">
                <div className="zue-box-content box-padding-medium">
                  <h4 className="font-opensans">{item.title}</h4>
                  <p className="teaser-text color-white">
                    <span className="text-small-up">{item.abstract}</span>
                    <span className="text-medium-up">{item.abstract}</span>
                    <span className="text-large-up">{item.abstract}</span>
                  </p>
                  <span>Discover now</span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
