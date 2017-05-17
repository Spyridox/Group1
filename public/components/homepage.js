'use strict';

let g_freelancers;
let geolocalization = '';
let mostRecentQuery = '';
// Container for the search bar and the search button
class SearchContainer extends React.Component {
  searchRequest(e) {
    // Function triggers only on button click (!e.keyCode) or enter key pressed
    if (!e.keyCode || e.keyCode == 13) {
      let searchWarning = document.getElementById('search-warning');
      let searchName = document.getElementById('search-what').value;
      if (!searchName.match(/[a-zA-Z0-9]*/)) {
        searchWarning.innerHTML = 'Only alphanumeric characters allowed.';
        return;
      }
      searchWarning.innerHTML = '';
      let query = `/search?keyword=${searchName}`;
      let origin = document.getElementById('search-where').value;
      if (!origin && geolocalization) {
        origin = geolocalization;
      }
      if (origin) {
        query += `&origin=${origin}`;
      }
      mostRecentQuery = query;
      ajaxRequest('GET', query + `&date=${new Date().toUTCString()}`, { ajax : true }, {}, renderFreelancers);
    }
  }
  render() {
    return (
      <div id="search-container">
        <div id="search-bar">
          <input id="search-what" name="search-what" placeholder="What?" onKeyDown={this.searchRequest} />
          <input id="search-where" name="search-where" placeholder="Where?" onKeyDown={this.searchRequest} />
          <button id="search-btn" onClick={this.searchRequest}>Search</button>
        </div>
        <div id="search-warning"></div>
      </div>
    );
  }
}

// Container for all filters
class FiltersContainer extends React.Component {
  toggleEmergency() {
    renderFreelancers(g_freelancers);
  }
  render() {
    let categories = [];
    for (let i = 0; i < this.props.categories.length; ++i) {
      let category = this.props.categories[i].categoryName;
      let categoryId = this.props.categories[i]._id;
      categories.push(<option id={'category-' + categoryId} value={category} key={i}>{category}</option>);
    }
    return (<div id="filters-container">
      <div id="filters">
        <div id="filter-category">
          <span id="category-label">Category: </span>
          <select id="filter-category-dropdown" name="filter-category-dropdown" defaultValue="" onChange={applyFilters}>
            <option value="">Anything</option>
            {categories}
          </select>
        </div>

        <div id="filter-distance">
          <span id="max-distance-label">Max distance: </span>
          <input id="filter-distance-temp" name="filter-distance-temp" placeholder="Distance in km" type="range" min="0" max="200" step="5" defaultValue="200" onKeyDown={applyFilters} onKeyUp={applyFilters} onInput={applyFilters} onChange={applyFilters}/>
        </div>
        <div id="filter-duration">
          <span id="max-duration-label">Max duration: </span>
          <input id="filter-duration-temp" name="filter-duration-temp" placeholder="Duration in minutes" type="range" min="0" max="240" defaultValue="240" step="10"onKeyDown={applyFilters} onInput={applyFilters} onChange={applyFilters}/>
        </div>
        <div id="filter-emergency">
          <span id="max-emergency-label">Emergency: </span>
          <input id="filter-emergency-temp" name="filter-emergency-temp" type="checkbox" onChange={this.toggleEmergency}/>
        </div>
      </div>
    </div>);
  }
}

// Button that redirects to `add freelancer form`
class FreelancerCreateBtn extends React.Component {
  redirectFreelancerForm() {
    document.location = '/freelance/new';
  }
  render () {
    return (<button id="freelancer-create-btn" onClick={this.redirectFreelancerForm} type="submit">Add a Freelancer</button>);
  }
}

// Card which displays a freelancer's information
class FreelancerCard extends React.Component {
  formatAvgScore(avgScore) {
    if (isNaN(avgScore)) {
      return '-';
    } else {
      return avgScore;
    }
  }
  formatPrice(price) {
    if (price) {
      return price.min + ' - ' + price.max + ' CHF';
    } else {
      return '-';
    }
  }
  formatDistance(distance, id) {
    if(!geolocalization && !document.getElementById('search-where').value) return 'Input a location'; // on first load, no distance info

    if (distance !== undefined && distance !== Number.MAX_SAFE_INTEGER) {
      return (distance / 1000).toFixed(2) + ' km';
    } else {
      return '';
    }
  }
  formatDuration(duration) {
    if(!geolocalization && !document.getElementById('search-where').value) return ''; // on first load, no distance info

    if (duration !== "undefined" && duration !== Number.MAX_SAFE_INTEGER) {
      return ', ' + (duration / 3600).toFixed(2) + ' h';
    } else {
      return 'Not reachable by car';
    }
  }
  formatEmergencyMessage(emergency) {
    if (emergency && emergency.end && emergency.location) {
      let endTime = new Date(emergency.end);
      return `Available for emergency until ${toTimeString(endTime)} in ${emergency.location}`;
    }
    return '';
  }
  redirectFreelancer(freelancer) {
    return function() {
      document.location = `/freelance/${freelancer.props._id}`;
    }
  }
  render () {
    let emergency = this.props.emergency;
    // If is rendering card for emergency, use emergency location and distance
    let distance = this.props.isemergency ? emergency.distance : this.props.distance;
    let duration = this.props.isemergency ? emergency.duration : this.props.duration;
    return (
      <div
        className="freelancer-card"
        onClick={this.redirectFreelancer(this)}
        data-category={this.props.category}
        data-distance={distance}
        data-duration={duration}
        data-emergency-available={emergency.available}
      >
        <div className="freelancer-card-picture-placeholder"><img src={this.props.urlPicture} /></div>
        <div className="freelancer-card-info">
          <h1 className="job-title  ">{this.props.title}</h1>
          <h2>{this.props.firstName} {this.props.familyName}</h2>
          <span>Average Score: {this.formatAvgScore(this.props.avgScore)} / 5</span>
          <span>Price range: {this.formatPrice(this.props.price)}</span>
          <span className="distance-info" name={"distance-" + this.props._id}>Distance: {this.formatDistance(distance)}{this.formatDuration(duration)}</span>
          <span>{this.formatEmergencyMessage(emergency)}</span>
        </div>
        <span className="category" data-category={this.props.categoryID}>{this.props.category}</span>
      </div>
    );
  }
}

// Container for all FreelancerCards
class FreelancersContainer extends React.Component {
  render() {
    let freelancers = [];
    for (let i = 0; i < this.props.freelancers.length; ++i) {
      let freelancer = this.props.freelancers[i];
      let categoryName = 'Other';
      let categoryId = '';
      if (freelancer.category) {
        categoryName = freelancer.category.categoryName;
        categoryId = freelancer.category._id;
      }
      freelancers.push(<FreelancerCard
        urlPicture = {freelancer.urlPicture}
        firstName  = {freelancer.firstName}
        familyName = {freelancer.familyName}
        title      = {freelancer.title}
        category   = {categoryName}
        categoryID = {categoryId}
        avgScore   = {freelancer.avgScore}
        price      = {freelancer.price}
        distance   = {freelancer.distance}
        duration   = {freelancer.duration}
        _id        = {freelancer._id}
        emergency  = {freelancer.emergency}
        isemergency = {this.props.isemergency}
        key        = {i}
        />);
    }
    return (
      <div id="freelancers-container">
        {freelancers}
      </div>
    );
  }
}

// Hide a freelancer card if the filters don't match the attributes
function applyFilters() {
  let isEmergency = document.getElementById('filter-emergency-temp').checked;
  let freelancers = document.getElementsByClassName('freelancer-card');
  let category = document.getElementById('filter-category-dropdown').value;
  let origin = document.getElementById('search-where').value;
  // format distance slider
  let distance = Number(document.getElementById('filter-distance-temp').value);
  let maxDistance = document.getElementById('filter-distance-temp').max;
  let distanceStr = "Max distance: " + distance;
  distanceStr += (distance == maxDistance) ? "+ km" : " km";
  document.getElementById('max-distance-label').innerHTML = distanceStr;
  distance *= 1000;
  // format time slider
  let duration = Number(document.getElementById('filter-duration-temp').value);
  let maxDuration = document.getElementById('filter-duration-temp').max;
  let durationStr = "Max time by car: " + duration;
  durationStr += (duration == maxDuration) ? "+ min" : " min";
  document.getElementById('max-duration-label').innerHTML = durationStr;
  duration *= 60;
  let count = 0; let count2 = 0;
  for (let freelancer of freelancers) {
    let fCategory = freelancer.getAttribute('data-category');
    let fDistance = Number(freelancer.getAttribute('data-distance'));
    let fDuration = Number(freelancer.getAttribute('data-duration'));
    let fAvailableForEmergency = freelancer.getAttribute('data-emergency-available');
    // Check if element must be visible or not
    if ((category && category !== fCategory) // Category doesn't correspond
        || (isEmergency && fAvailableForEmergency === 'false') // If search for emergency and freelancer is not available
        || ((origin !== "" || geolocalization !== "") // There is a valid geolocation
           && ((distance / 1000 != maxDistance && fDistance > distance) // Freelancer is not in range
               || duration / 60 != maxDuration && fDuration > duration))) {
      freelancer.style.display = 'none';
    } else {
      freelancer.style.display = 'flex';
    }
  }
}

function renderPage(data) {
  renderSearch();
  ajaxRequest("GET", "/category", { ajax : true }, {}, renderFilters);
  renderFreelancerCreateBtn();
  ajaxRequest("GET", "/search", { ajax : true }, {}, renderFreelancers);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      if (position) {
        geolocalization = `${position.coords.latitude},${position.coords.longitude}`;
        let query = mostRecentQuery || `/search?origin=${geolocalization}`;
        if(!query.includes('origin')) {
          query += `&origin=${geolocalization}`
        }
        console.log(query);
        ajaxRequest("GET", query + `&date=${new Date().toUTCString()}`, { ajax : true }, {}, renderFreelancers);
      }
    }, null, { enableHighAccuracy : false, maximumAge : 600 });
  }
}

function renderSearch() {
  ReactDOM.render(<SearchContainer />, document.getElementById('react-search-container'));
}

function renderFilters(categories) {
  ReactDOM.render(<FiltersContainer categories={categories}/>, document.getElementById('react-filters-container'));
}

function renderFreelancerCreateBtn() {
  ReactDOM.render(<FreelancerCreateBtn />, document.getElementById('react-freelancer-create-btn'));
}

function renderFreelancers(freelancers) {
  g_freelancers = freelancers;
  // Sort by distance
  let isEmergency = document.getElementById('filter-emergency-temp').checked ? 'true' : ''; // `false` must be empty string
  if (freelancers) {
    if (isEmergency) {
      freelancers.sort(function(a, b) {
        if (a.emergency.distance < b.emergency.distance) {
          return -1;
        } else if (a.emergency.distance > b.emergency.distance) {
          return 1;
        }
        return 0;
      });
    } else {
      freelancers.sort(function(a, b) {
        if (a.distance < b.distance) {
          return -1;
        } else if (a.distance > b.distance) {
          return 1;
        }
        return 0;
      });
    }
  }
  ReactDOM.render(<FreelancersContainer freelancers={freelancers} isemergency={isEmergency} />,
                  document.getElementById('react-freelancers-container'),
                  applyFilters);
}

renderPage();
