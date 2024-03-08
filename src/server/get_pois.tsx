"use server";

import fs from "node:fs/promises";
import { clusterPOIS } from "./dbscan";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "@/server/firebase";

require("dotenv").config();

const api_key = "&api_key=" + process.env.FLICKR_KEY;
const format = "&format=" + "json";
const callback = "&nojsoncallback=" + "1";

export async function getPois(
  latitude: number,
  longitude: number,
  radius: number,
) {
  return getPhotos(latitude, longitude, radius);
}
function getPhotos(latitude: number, longitude: number, radius: number) {
  const has_geo = "&has_geo" + "true";
  const lat = "&lat=" + latitude;
  const lon = "&lon=" + longitude;
  const rad = "&radius=" + radius;
  const query =
    "https://www.flickr.com/services/rest/?method=flickr.photos.search" +
    format +
    api_key +
    has_geo +
    lat +
    lon +
    rad +
    callback;

  return fetch(query, { method: "GET" })
    .then(function (response) {
      return response.json();
    })
    .then(function (write) {
      const trimmed = write.photos.photo;
      trimmed.forEach(
        (element: {
          owner: any;
          secret: any;
          server: any;
          farm: any;
          ispublic: any;
          isfriend: any;
          isfamily: any;
        }) => {
          delete element.owner;
          delete element.secret;
          delete element.server;
          delete element.farm;
          delete element.ispublic;
          delete element.isfriend;
          delete element.isfamily;
        },
      );
      const string = JSON.stringify(trimmed);
      fs.writeFile("./saves/flickr.json", string);
      console.log('File "Photos" written successfully');
      return trimmed;
    })
    .then(async function (location) {
      const promises = location.map((x: object) => getLocation(x));
      const responses = await Promise.all(promises);
      return responses;
    })
    .then(function (write) {
      let locations: {
        id: string;
        latitude: string;
        longitude: string;
        country: object;
      }[] = [];
      write.forEach((element) => {
        locations.push({
          id: element.photo.id,
          latitude: element.photo.location.latitude,
          longitude: element.photo.location.longitude,
          country: element.photo.location.county,
        });
      });
      const string = JSON.stringify(locations);
      fs.writeFile("./saves/location.json", string);
      console.log('File "Location" written successfully');

      clusterPOIS(locations, 0.0005, 2);
    })
    .catch(function (err) {
      console.log(`Error: ${err}`);
    });
}
function getLocation(photo_id: object) {
  const photo_query = "&photo_id=" + (photo_id as any).id;
  const query =
    "https://www.flickr.com/services/rest/?method=flickr.photos.geo.getLocation" +
    format +
    api_key +
    photo_query +
    callback;

  return fetch(query, { method: "GET" })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}

function pushToFirebase() {
  const docRef = addDoc(collection(db, "cities"), {
    name: "Tokyo",
    country: "Japan",
  });
  console.log("Document written with ID: ", docRef);
}
