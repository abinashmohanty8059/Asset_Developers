import React from 'react';
import { locationStats, locationBenefits } from '../data/websiteData';

export default function Location() {
  return (
    <section id="location">
      <div className="wrap">
        <div className="reveal">
          <div className="eyebrow" style={{ color: '#a97f2c' }}>
            Location
          </div>
          <h2>The most accessible premium address on the Dwarka Expressway</h2>
        </div>

        <div className="loc-top reveal">
          <img
            src="/images/location-map-color.jpg"
            alt="Sector 88A Gurugram zoning map showing India World Mart location"
            loading="lazy"
          />
          <div className="stat-list">
            {locationStats.map((stat, idx) => (
              <div className="stat" key={idx}>
                <div>
                  <h4>{stat.value}</h4>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="benefits reveal">
          {locationBenefits.map((benefit, idx) => (
            <div className="b" key={idx}>
              <h4>{benefit.title}</h4>
              <p>{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="context-panel reveal">
          <img
            src="/images/aerial-context-map.jpg"
            alt="Aerial masterplan context showing SCO colony, luxury group housing and Vatika residential colony"
            loading="lazy"
          />
          <div className="txt">
            <div className="eyebrow">Master Layout Context</div>
            <h3>Surrounded by sold-out luxury addresses</h3>
            <p>
              India World Mart's SCO colony sits directly opposite an Experion luxury
              residential project, with fully-sold residential plots and a 100+ acre
              Vatika residential colony, plus a 4-acre luxury group housing plot, all along
              the 150 m-wide Dwarka Expressway and the NH352B Super Expressway.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
