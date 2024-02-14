const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function chartsFunction(sample_info){
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        // console.log("Data from samples.json:", data);
      console.log(data)
        const numberofSamples = data.samples;
        //console.log("Number of Samples:", numberofSamples)

        const selectedSample = numberofSamples.filter(sample => sample.id == sample_info);
        const firstSample = selectedSample[0];
        
        const otuIDs = firstSample.otu_ids;
        const otuLabels = firstSample.otu_labels;
        const sampleValues = firstSample.sample_values;

        let trace = {
          x: sampleValues,
          y: otuIDs,
          type: "bar",
        };
        Plotly.newPlot("bar", trace)

       // for (let i = 0; i < numberofSamples; i++){
         //   const otuIDs = data.samples[i].otu_ids.slice(0, 10);
          //  const sampleValues = data.samples[i].sample_values.slice(0, 10);
           // const otuLabels = data.samples[i].otu_labels.slice(0, 10);

        //console.log("OTU IDs:", otuIDs);
        //console.log("OTU Labels:", otuLabels);
        //console.log("Sample Values:", sampleValues);
        }
)
    //.catch(error => {
      //  console.error("Error fetching data:", error);
   // });

//chartsFunction(sample_info)};
    };