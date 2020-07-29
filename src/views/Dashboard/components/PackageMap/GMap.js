import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
 
export class GMap extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   stores: [{lat: 37.7749, lng: -122.4194},
  //   //     {latitude: 37.7749, longitude: -122.4194},
  //   //     {latitude: 37.74, longitude: -122.49}]
  //   // }
  // }
  render() {
    console.log('GMap trackingInfo->', this.props);
    // console.log("this.lat: ", this.props.lat)
    const mapStyles = {
      width: '100%',
      height: '100%'
    }
    return (

      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: 37.7749, lng: -122.4194}}
      >
        {/* <Marker position={{ lat: 48.00, lng: -122.00}} /> */}
        {/* {this.displayMarkers()} */}
        {/* console.log("this.lat: ", this.lat) */}
        <Marker
          name={'Your position'}
          position={{lat: 37.759703, lng: -122.428093}}
        />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyD3CEh9DXuyjozqptVB5LA-dN7MxWWkr9s')
})(GMap)















    // if(this.props.geo !== undefined){
    //   let array = this.props.geo.split(',');
    //   console.log('Typeof(this.lat)->', typeof parseFloat(this.lat) );
    //   console.log('this.lat->', this.lat);
    //   console.log('this.lng->', this.lng);
    // }






      // console.log('GMap props->',this.props)
  // componentDidUpdate() {
  //   console.log('GMap props->', this.props.geo);
  //   if(this.props.geo !== undefined){
  //     let array = this.props.geo.split(',');
  //     this.lat = array[0];
  //     this.lng = array[1];
  //     console.log('Typeof(this.lat)->', typeof parseFloat(this.lat) );
  //     console.log('this.lat->', this.lat);
  //     console.log('this.lng->', this.lng);
  //   }
  // }


  // displayMarkers = () => {
  //   console.log("this.lat: ", this.lat)
  //   return this.state.stores.map((store, index) => {
  //     return <Marker key={index} id={index} position={{
  //       lat: store.latitude,
  //       lng: store.longitude
  //     }}
  //     onClick={() => console.log("You clicked me!")} />
      
  //   })
    
  // }
