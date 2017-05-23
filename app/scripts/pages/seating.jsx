import React from 'react';

class Seating extends React.Component {

  componentDidMount () {
    var chart = new seatsio.SeatingChart({
        divId: "chart",
        publicKey: "c10df3a1-4dbf-48c3-9593-b0075490b7ef",
        event: "f80726c4-1427-4214-af39-ed4a3007cb8e",
        onObjectSelected: (object) => {
          this.appendTicket(object.id, object.category.label)
        },
        // onObjectDeselected: (object) => {
        //   this.removeTicket(object.id)
        // }
    }).render();
  }

  appendTicket(seat, category) {
    let newHref
    let href = document.getElementById("universe-button").href
    if (href.indexOf('?') >= 0) {
      let query = decodeURI(href.split('state=')[1])
      query = JSON.parse(query)
      debugger
      if (query.seats[category]) {
        query.seats[category].push(seat)
      } else {
        query.seats[category] = [seat]
      }
      let updatedSeats = encodeURI(`?state=${JSON.stringify(query)}`)
      newHref = `${href.split('?')[0]}${updatedSeats}`
    } else {
      let query = encodeURI(`?state={"seats":{"${category}":["${seat}"]}}`)
      newHref = `${href}${query}`
    }
    document.getElementById("universe-button").href = newHref
  }

  // removeTicket(seat) {
  //   let newHref;
  //   let href = document.getElementById("universe-button").href
  //   let split = href.split(seat)
  //   if (split[1].indexOf(',') >= 0) {
  //     newHref = split[0] + split[1].split(',')[1]
  //   } else {
  //     newHref = split[0]
  //   }
  //   document.getElementById("universe-button").href = newHref
  // }

  render() {
    return (
      <div>
        <div id='chart'></div>
        <a id='universe-button' className='unii-listing-button unii-pink unii-medium' href='http://uvrs.tech:8080/embed2/events/58f10b345ac5f9c9e44f803b'>Get Tickets</a>
      </div>
    );
  }
}

export default Seating;
