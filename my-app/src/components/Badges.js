import React, { useState, useEffect } from "react";
import './Badges.css';

const Badges = ({ provider, volunteerAddress }) => {
  const [badges, setBadges] = useState([]);
  const [poapBadges, setPoapBadges] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const POAP_API_KEY = '';
  const POAP_API_URL = 'https://api.poap.xyz/actions/scan/';
  const GITPOAP_EVENT_ID = ''; // Put your GitPOAP event ID here

  useEffect(() => {
    const fetchBadges = async () => {
      if (!provider || !volunteerAddress) return;

      // Fetch POAP badges
      try {
        const response = await fetch(`${POAP_API_URL}${volunteerAddress}?eventId=${GITPOAP_EVENT_ID}`, {
          headers: {
            'X-API-Key': POAP_API_KEY,
          },
        });
        const poapBadges = await response.json();

        // Set fetched POAP badges
        setPoapBadges(poapBadges);
      } catch (error) {
        console.error('Error fetching POAP badges:', error);
      }
    };

    fetchBadges();
  }, [provider, volunteerAddress]);

    const mapBadgeToColor = (hours) => {
    if (hours < 50) {
      return 'bronze';
    } else if (hours < 100) {
      return 'silver';
    } else {
      return 'gold';
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBadges = badges.filter((badge) => {
    if (filter === "all") return true;
    if (filter === "bronze") return badge.hoursContributed < 50;
    if (filter === "silver") return badge.hoursContributed >= 50 && badge.hoursContributed < 100;
    if (filter === "gold") return badge.hoursContributed >= 100;
    if (filter === "humanitarian") return badge.badgeDescription.toLowerCase().includes("humanitarian");
    if (filter === "environmental") return badge.badgeDescription.toLowerCase().includes("environmental");
    if (filter === "educational") return badge.badgeDescription.toLowerCase().includes("educational");
    return false;
  });

  const searchedBadges = filteredBadges.filter((badge) => {
    return badge.badgeDescription.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      {/* ... (rest of the JSX code remains unchanged) */}

      <div className="poap-badge-container">
        {poapBadges.map((badge, index) => (
          <div className="poap-badge-card" key={index}>
            <img src={badge.image_url} alt="POAP badge" />
            <h3 className="poap-badge-name">{badge.name}</h3>
            <p className="poap-badge-description">{badge.description}</p>
            <p className="poap-badge-date">Event Date: {badge.event_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Badges;

