"use server"
import fs from "node:fs/promises";

export async function clusterPOIS(data:{id:string,latitude:string, longitude:string,country:object}[], distance:number, minPTS:number){
    const DBSCAN = require('density-clustering/lib').DBSCAN;
    const dbscanData:number[][] = data.map((data) => {
        return [parseFloat(data.latitude),parseFloat(data.longitude)]
    })

    const dbscan = new DBSCAN();
    const clusters:number[][] = dbscan.run(dbscanData, distance, minPTS);

    const clustered_data:{}[] = clusters.map((clusters) => {
        return data[clusters[0]]
    });
    console.log("Clusters:" + clustered_data)
    const string = JSON.stringify(clustered_data);
    fs.writeFile("./saves/clustered.json", string);
    console.log("File \"Clustered\" written successfully")
}
